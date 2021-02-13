'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    require: true,
    index: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});
