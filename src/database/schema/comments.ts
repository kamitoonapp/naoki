'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User reference required'],
    ref: 'User',
  },
  targetType: {
    type: String,
    enum: ['comment', 'post', 'webtoon', 'chapter'],
  },
  target: {
    type: Schema.Types.ObjectId,
    require: false,
  },
  content: {
    type: String,
    maxLength: 1000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
