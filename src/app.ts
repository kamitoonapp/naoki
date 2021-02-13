'use strict';

import * as express from 'express';
import routes from './routes';

// Create app
const app = express();

// Load routes in app
routes(app);

// Main endpoints
app.get('/', (req, res) => {
  res.status(200).json('Welcome to Naoki ! an API for KamiToon');
});

export default app;
