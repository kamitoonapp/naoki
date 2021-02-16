'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    index: true,
    ref: 'User',
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
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
