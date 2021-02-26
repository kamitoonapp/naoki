'use strict';

import {
  Schema,
} from 'mongoose';
import {
  genresKey,
} from './../../util/constant';
import seasons from './webtoon/seasons';

const webtoons = new Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 30,
    trim: true,
    require: [true, 'Webtoon name required'],
  },
  genres: {
    type: [String],
    validate: {
      validator: function(genres: [string]): boolean {
        return genres.every((genre) => genresKey.includes(genre));
      },
      message: () => `Invalid key(s) for genres`,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  preface: {
    type: String,
  },
  synopsis: {
    type: String,
    trim: true,
    maxLength: 3000,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  forAdult: {
    type: Boolean,
    default: false,
  },
  violence: {
    type: Boolean,
    default: false,
  },
  accept_cgu: {
    type: Number,
    enum: [1],
    require: [true, 'Last version of cgu required'],
  },
  likes: {
    type: Schema.Types.Decimal128,
    default: 0,
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  seasons: {
    type: [seasons],
  },
});

export default webtoons;
