'use strict';

import * as express from 'express';
import routes from './routes';

// Create app
const app = express();

// Make global middleware
app.use((req, res, next) => {
  // Check if client accept types
  if (!['application/json', '*/*'].includes(req.headers.accept)) {
    return res.status(406).end('(⌐■_■)');
  };

  // Get token with are type
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    res.locals.credentials = {
      type: token[0],
      token: token[1],
    };
  };

  next();
});

// Load routes in app
routes(app);

// Main endpoints
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Naoki ! an API for KamiToon');
});

export default app;
