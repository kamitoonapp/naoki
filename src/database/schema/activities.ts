'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: [true, 'Need user reference'],
    ref: 'User',
  },
  type: {
    type: String,
    require: [true, 'Activities type required'],
    enum: ['like', 'post'],
  },
  target: {
    type: Schema.Types.ObjectId,
    require: [true, 'Need target reference'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
