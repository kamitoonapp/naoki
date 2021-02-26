'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: [true, 'User reference required'],
    index: true,
    ref: 'User',
  },
  content: {
    type: String,
    maxLength: 3000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likedBy: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
});
