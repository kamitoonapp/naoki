'use strict';

import * as mongoose from 'mongoose';
import activities from './schema/activities';
import comments from './schema/comments';
import posts from './schema/posts';
import users from './schema/users';
import authentificates from './schema/authentificates';
import errors from './schema/errors';

/**
 * Load function
 */
export default function() {
  mongoose.model('Activitie', activities);
  mongoose.model('Comment', comments);
  mongoose.model('Post', posts);
  mongoose.model('User', users);
  mongoose.model('Authentificate', authentificates);
  mongoose.model('Error', errors);
};
