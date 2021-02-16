'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  type: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  timestamp: {
    type: Date,
  },
});
