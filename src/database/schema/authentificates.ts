'use strict';

import {
  Schema,
} from 'mongoose';

export default new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
  accept_cgu: {
    type: String,
    require: true,
  },
});
