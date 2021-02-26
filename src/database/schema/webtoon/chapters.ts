'use strict';

import {
  Schema,
} from 'mongoose';

const episodes = new Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 30,
    trim: true,
    require: [true, 'Chapter name required'],
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
  preface: {
    type: String,
  },
  images: {
    type: [String],
  },
  musics: {
    type: [String],
  },
});

export default episodes;
