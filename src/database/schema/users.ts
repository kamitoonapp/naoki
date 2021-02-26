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
    require: [true, 'Username required'],
    minLength: 1,
    maxLength: 30,
    trim: true,
  },
  discriminator: {
    type: String,
    require: true,
    minlength: 5,
    maxLength: 5,
    trim: true,
    match: /\d{5}/,
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
      ref: 'Webtoon',
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
    default: Date.now,
  },
});

export default users;
