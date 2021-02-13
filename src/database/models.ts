'use strict';

import * as mongoose from 'mongoose';
import activities from './schema/activities';
import comments from './schema/comments';
import posts from './schema/posts';
import users from './schema/users';
import authentificates from './schema/authentificates';

/**
 * Load function
 */
export default function() {
  mongoose.model('Activities', activities);
  mongoose.model('Comments', comments);
  mongoose.model('Posts', posts);
  mongoose.model('Users', users);
  mongoose.model('Authentificates', authentificates);
};
