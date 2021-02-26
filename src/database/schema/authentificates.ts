'use strict';

import {
  Schema,
} from 'mongoose';
import {
  emailRegex,
} from './../../util/regex';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    trim: true,
    require: [true, 'Need user reference'],
    ref: 'User',
  },
  email: {
    type: String,
    require: [true, 'User email required'],
    index: true,
    unique: true,
    match: emailRegex,
  },
  password: {
    type: String,
    require: [true, 'User password required'],
    minLength: 8,
  },
  token: {
    type: String,
    require: [true, 'User token is required'],
  },
  accept_cgu: {
    type: Number,
    require: [true, 'Last CGU version required'],
    alias: 'cgu',
    enum: [1],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
