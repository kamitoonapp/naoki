'use strict';

import {
  Schema,
} from 'mongoose';

/**
 * FLAGS:
 * acceptCGU
 */

const users = new Schema({
  username: {
    type: String,
    require: true,
  },
  discriminator: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  flags: {
    type: Number,
    default: 0,
  },
  webtoons: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Webtoon'
    }],
  },
  subscribes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  timestamp: {
    type: Date,
  },
});

users.path('username').get(function (username) {
  return username + '#' + this.discriminator;
});

export default users;