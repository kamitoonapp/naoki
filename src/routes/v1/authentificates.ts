'use strict';

import * as express from 'express';
import {
  createHash,
} from 'crypto';
import {
  jsonError,
} from './../../util/constant';
import * as mongoose from 'mongoose';
import * as cluster from 'cluster';
import {
  MongoError,
} from 'mongodb';

interface jsonErrors {
  code: number;
  message: string;
  data?: any;
}

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line max-len
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

let inc = 0;
const epoch = Date.now() - Date.parse('01 Jan 2021 00:00:00 GMT');

/**
 * Create unused token
 * @param {string} id
 * @return {string}
 */
function genToken(id?: string): string {
  inc++;
  return Buffer
      .from(
          id + '.' +
          String(epoch * cluster.worker.id * inc) + '.' +
          String(process.pid),
      )
      .toString('base64');
};

let incDiscriminator = 0;

/**
 * Return an discriminator incremented
 * @return {string}
 */
function getDiscriminator(): string {
  incDiscriminator++;

  if (String(incDiscriminator).length > 5) incDiscriminator = 1;

  const discriminator = String(incDiscriminator);

  return '0'.repeat(5 - discriminator.length) + discriminator;
};

/**
 * Generate unused discriminator by contribution to username
 * @param {string} username
 * @return {string}
 */
function genDiscriminator(username: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    let search = true;
    do {
      const discriminator = getDiscriminator();

      const exist = await new Promise((_resolve) => {
        mongoose.model('User').exists({
          username,
          discriminator,
        }, (err, exist) => {
          if (err) reject(err);
          _resolve(exist);
        });
      });

      if (!exist) {
        search = false;
        resolve(discriminator);
      };
    } while (search);
  });
};

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/register', async (req, res) => {
  const errors: [jsonErrors?] = [];

  const data = {
    email: null,
    password: null,
    acceptCGU: null,
    username: null,
  };

  if (req.body.acceptCGU != 'true') {
    errors.push({
      code: 1002,
      message: jsonError[1002],
    });
  } else data.acceptCGU = req.body.acceptCGU;

  if (emailRegex.test(req.body.email)) {
    data.email = req.body.email;
  } else {
    errors.push({
      code: 1004,
      message: jsonError[1004],
    });
  };

  if (
    req.body.username &&
    req.body.username.length > 0 &&
    req.body.username.length < 30
  ) {
    data.username = req.body.username;
  } else {
    errors.push({
      code: 1003,
      message: jsonError[1003],
    });
  };

  if (req.body.password && req.body.password.length > 12) {
    data.password = createHash('sha256')
        .update(req.body.password).digest('hex');
  } else {
    errors.push({
      code: 1006,
      message: jsonError[1006],
    });
  };

  if (errors.length > 0) {
    return res.status(400).json({
      data: null,
      errors,
    });
  };

  const userId = new mongoose.Types.ObjectId();

  const discriminator = await genDiscriminator(data.username).catch((e) => e);

  if (discriminator instanceof Error) {
    return res.status(400).json({
      data: null,
      errors: [{code: 1007, message: jsonError[1007]}],
    });
  };

  const token = genToken(userId.toHexString());

  let auth = await mongoose.model('Authentificate').create({
    user: userId,
    email: data.email,
    password: data.password,
    accept_cgu: data.acceptCGU,
    token,
  }).catch((e) => e) as any;


  if (auth instanceof MongoError) {
    auth = auth as any;
    if (auth.code == 11000) {
      return res.status(400).json({
        data: null,
        errors: [{
          code: 1008,
          message: jsonError[1008],
          data: auth.keyPattern,
        }],
      });
    } else {
      console.error(auth);
      return res.status(500).end();
    }
  };

  await mongoose.model('User').create({
    _id: userId,
    username: data.username,
    discriminator,
  });

  return res.status(200).json({
    data: {
      _id: userId,
      email: data.email,
      accept_cgu: data.acceptCGU,
      token,
      username: data.username,
      discriminator,
    },
  });
});

router.post('/login', async (req, res) => {
  const errors: [jsonErrors?] = [];

  const data = {
    email: null,
    password: null,
  };

  if (req.body.email && emailRegex.test(req.body.email)) {
    data.email = req.body.email;
  } else {
    errors.push({
      code: 1004,
      message: jsonError[1004],
    });
  };

  if (req.body.password) {
    data.password = createHash('sha256')
        .update(req.body.password)
        .digest('hex');
  } else {
    errors.push({
      code: 1006,
      message: jsonError[1006],
    });
  };

  if (errors.length > 0) {
    return res.status(400).json({
      data: null,
      errors,
    });
  };

  const auth = await mongoose.model('Authentificate').findOne({
    email: data.email,
    password: data.password,
  }, ['user', 'email', 'token']).populate('user').exec() as any;

  if (!auth) {
    return res.status(400).json({
      data: null,
      errors: [{
        code: 1009,
        message: jsonError[1009],
      }],
    });
  };

  return res.status(200).json({
    data: auth,
  });
});

export default router;
