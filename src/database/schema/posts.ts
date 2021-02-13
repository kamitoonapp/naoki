'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    require: true,
    index: true,
  },
  content: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
  likedBy: {
    type: [Schema.Types.ObjectId],
  },
  comments: {
    type: [Schema.Types.ObjectId],
  },
});
