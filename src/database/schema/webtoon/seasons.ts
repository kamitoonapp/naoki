'use strict';

import {
  Schema,
} from 'mongoose';
import chapters from './chapters';

const seasons = new Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 30,
    trim: true,
    require: [true, 'Season name required'],
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Schema.Types.Decimal128,
    default: 0,
  },
  chapters: {
    type: [chapters],
  },
});

export default seasons;
