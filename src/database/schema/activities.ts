'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    require: true,
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
