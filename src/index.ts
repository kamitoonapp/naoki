'use strict';

import * as cluster from 'cluster';
import * as os from 'os';
import * as http from 'http';
import app from './app';
import * as mongoose from 'mongoose';
import log from './util/log';
import models from './database/models';

const [
  port,
  host,
  mongoURI,
]: [number, string, string] = [
  parseInt(process.env.PORT) || 3000,
  process.env.HOST || '0.0.0.0',
  process.env.MONGOURI || 'mongodb://localhost:27017/kamitoon',
];

// Auto scaling
const maxWorker = os.cpus().length * 2; // 2 worker per CPU
let scale = 1; // number of worker (scale calcuted per minutes)
let entries = 0; // number of request
/**
 * Example for 5 connection in one minutes
 * 2 workers fork + (base)
 * x = 10 / 5 + 1 = 3
 * x > maxWorker -> maxWorker
 * x < maxWorker -> x
 */
const ratio = 5;
let checkScale;

/**
 * Calculate scale
 * @param {number} num - entries
 * @return {number}
 */
function getScale(num: number): number {
  const _scale = Math.floor(num / ratio) + 1;
  if (_scale >= maxWorker) return maxWorker;
  else return _scale;
};

/**
 * Generate scale
 */
function generateScale() {
  scale = getScale(entries); // get new scale

  // Count of working fork
  const workers = Object.keys(cluster.workers).length;

  log(
      '[CLUSTER]',
      'Scale: %s / %s, workers: %s, entries: %s',
      scale,
      maxWorker,
      workers,
      entries,
  );

  if (workers > scale) {
    log('[CLUSTER]', 'Workers exceeded, rescalling ...');
    // Kill exceeded workers
    for (let i = 0; i > workers - scale; i++) {
      cluster.workers[i].kill();
    };
  };

  if (workers < scale) {
    log('[CLUSTER]', 'Missing workers, forking ...');
    // Generate workers
    for (let i = 0; i < scale - workers; i++) {
      cluster.fork();
    };
  };
};

/**
 * Auto scale
 */
function autoScaling() {
  // destroy auto rescaling due to inactivity
  if (entries == 0) {
    log('[CLUSTER]', 'auto scaling destroyed due to inactivity');
    clearInterval(checkScale);
  };
  generateScale(); // Reset scaling
  entries = 0; // reset entries
};

if (cluster.isMaster) {
  cluster.on('fork', (fork) => {
    fork.on(
        'disconnect',
        () => log('[FORK %s]', 'disconnected', fork.id),
    );
    fork.on(
        'error',
        (err) => log('[FORK %s]', 'error', fork.id, err),
    );
    fork.on(
        'exit',
        (code, signal) => log(
            '[FORK %s]', 'exited, code: %s, signale: %s',
            fork.id,
            code,
            signal,
        ),
    );
    fork.on(
        'listening',
        (address) => log(
            '[FORK %s]', 'listening [IPv%s] at http://%s:%s',
            fork.id,
            address.addressType,
            address.address,
            address.port,
        ),
    );
    fork.on(
        'message',
        (message) => {
          log('[FORK %s]', 'new message', fork.id, message);
          // reset scale for each entries
          if (message.type == 'entries') {
            // scale trigger
            if (checkScale._destroyed) {
              checkScale = setInterval(autoScaling, 6e4); // 1 minutes
            };
            entries = entries + message.count;
            generateScale();
          };
        },
    );
    fork.on(
        'online',
        () => log('[FORK %s]', 'fork is online', fork.id),
    );
  });

  generateScale();

  checkScale = setInterval(autoScaling, 6e4); // 1 minute
};

if (cluster.isWorker) {
  // Connect to DataBase
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.on(
      'connected',
      () => log('[MONGO]', 'database connected'),
  );
  mongoose.connection.on(
      'disconnected',
      () => log('[MONGO]', 'database disconnected'),
  );

  // Load schema's mongodb
  models();

  // Create server
  const server = http.createServer(app);

  server.listen(
      port,
      host,
      0,
      () => {
        const address = server.address() as {
              family: string,
              address: string,
              port: number,
            };
        log(
            '[SERVER]', '╰(*°▽°*)╯ Server [%s] listening at http://%s:%s',
            address.family,
            address.address,
            address.port,
        );
      },
  );

  // Send events for each connection
  server.on('connection', () => process.send({type: 'entries', count: 1}));
};
