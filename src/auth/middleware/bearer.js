'use strict';

const users = require('../models/users.js');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) { next('Invalid Login');  return;}

  try {

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateBearer(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};
