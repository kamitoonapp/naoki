'use strict';

import * as express from 'express';
import {
  jsonError,
} from './../../util/constant';
import * as mongoose from 'mongoose';

// eslint-disable-next-line max-len
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

const router = express.Router();

// Make body
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use(async (req, res, next) => {
  // check credential
  if (!req.headers.authorization) {
    return res.status(401).json({
      data: null,
      errors: [{
        code: 1000,
        message: jsonError[1000],
      }],
    });
  };

  // Fetch user data (synchrenous with user Schema)
  res.locals.auth = await mongoose.model('Authentificate').findOne({
    token: req.headers.authorization,
  }, ['user', 'email']).populate('user').exec();

  // Check user data
  if (!res.locals.auth) {
    return res.status(401).json({
      data: null,
      errors: [{
        code: 1000,
        message: jsonError[1000],
      }],
    });
  };

  next();
});

router.get('/@me', async (req: any, res) => {
  // send user data
  return res.status(200).json({data: {
    ...res.locals.auth.user._doc, // ಥ_ಥ
    email: res.locals.auth._doc.email,
  }});
});

router.get('/:id', async (req, res) => {
  let id: mongoose.Types.ObjectId;

  // Try get id
  try {
    id = new mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{
        code: 1001,
        message: jsonError[1001],
      }],
    });
  };

  // Fetch user data
  const user = await mongoose.model('User')
      .findById(id) as any;

  // check user data
  if (!user) return res.status(404).json({data: null, errors: [{code: 1009, message: jsonError[1009]}]});

  // Send user data
  return res.status(200).json({data: user._doc});
});

router.patch('/@me', async (req, res) => {
  const errors = [];

  const data: {
    username?: string;
    email?: string;
  } = {};

  // Get username if it's correct
  if (req.body.username) {
    if (req.body.username.length > 0 && req.body.username.length < 30) {
      data.username = req.body.username;
    } else {
      errors.push({
        code: 1003,
        message: jsonError[1003],
      });
    };
  };

  // Get email if it's correct
  if (req.body.email) {
    if (emailRegex.test(req.body.email)) {
      data.email = req.body.email;
    } else {
      errors.push({
        code: 1004,
        message: jsonError[1004],
      });
    };
  };

  // Send errors if there is any
  if (errors.length > 0) {
    return res.status(400).json({data: null, errors});
  };

  // Save data
  if (data.email) {
    res.locals.auth.email = data.email;

    delete data.email;
  };

  res.locals.auth.save();

  await mongoose.model('User').updateOne({_id: res.locals.auth.user._id}, data);

  return res.status(200).json({data: {...Object.assign(res.locals.auth.user._doc, {...data}), email: res.locals.auth.email}});
});

router.put('/webtoons/:id', async (req, res) => {
  let id: mongoose.Types.ObjectId;

  // Try get id
  try {
    id = new mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{
        code: 1001,
        message: jsonError[1001],
      }],
    });
  };

  await mongoose.model('User').updateOne({_id: res.locals.auth.user._id}, {
    $push: {
      webtoons: id,
    },
  });

  return res.status(204).end();
});

router.delete('/webtoons/:id', async (req, res) => {
  let id: mongoose.Types.ObjectId;

  // Try get id
  try {
    id = new mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{
        code: 1001,
        message: jsonError[1001],
      }],
    });
  };

  await mongoose.model('User').updateOne({_id: res.locals.auth.user._id}, {
    $pull: {
      webtoons: id,
    },
  });

  return res.status(204).end();
});

export default router;
