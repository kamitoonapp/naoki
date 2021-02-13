'use strict';

import {
  Application,
} from 'express';
import users from './routes/v1/users';
import authentificates from './routes/v1/authentificates';

/**
 * Load routes
 * @param {Express.Application} app
 */
function loadRoutes(app: Application) {
  app.use('/v1/users', users);
  app.use('/v1/authentificates', authentificates);
};

export default loadRoutes;
