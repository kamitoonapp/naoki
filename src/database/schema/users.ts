'use strict';

import {
  Schema,
} from 'mongoose';

/**
 * FLAGS:
 * acceptCGU
 */

export default new Schema({
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
    type: [Schema.Types.ObjectId],
  },
  subscribes: {
    type: [Schema.Types.ObjectId],
  },
});
