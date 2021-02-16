'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});
