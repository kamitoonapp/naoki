'use strict';

import * as express from 'express';
import routes from './routes';

// Create app
const app = express();

// Load routes in app
routes(app);

app.use((req, res, next) => {
  if (!['application/json', '*/*'].includes(req.headers.accept)) {
    return res.status(406).end('(⌐■_■)');
  };

  next();
});

// Main endpoints
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Naoki ! an API for KamiToon');
});

export default app;
