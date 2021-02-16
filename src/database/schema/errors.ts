'use strict';

import axios from 'axios';
import {
  Schema,
} from 'mongoose';
import {webhook} from './../../../config.js';

/**
 * FLAGS:
 * acceptCGU
 */

const errors = new Schema({
  name: String,
  message: String,
  stack: String,
  code: Number,
  extra: Object,
});

errors.post('save', (data) =>
  axios({
    url: webhook + '?wait=false',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      // eslint-disable-next-line max-len
      content: `\`\`\`xl\nERROR LOGGED:\n\nService: 'Naoki'\nID: '${data._id}'\n\nRESPONSE:\n\nname: '${data.name}'\nmessage: '${data.message}'\ncode: ${data.code}\ntime: ${new Date()}\n\nstack: ${data.stack}\n\`\`\``,
    },
  }),
);

export default errors;
