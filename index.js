'use strict';

// Start up DB Server
require('dotenv').config();
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Start the web server


mongoose
  .connect(process.env.MONGOOSE_URI, options)
  .then(() => {
    require('./src/server.js').start(process.env.PORT);
  })
  .catch((e) => {
    console.log('🔈 WARNING ✋🔴 THERE IS ⚠️CONNECTION_ERROR⚠️ IN 🚀 ~ file: index.js ~ line 18 ~ e.massage ➡️ ', e.massage);
  });