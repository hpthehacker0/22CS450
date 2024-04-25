const mongoose = require('mongoose');
const app = require('../config').app;

// let connection;

module.exports.connection = () => {
  return mongoose.connect(
    `mongodb://${app.dbDomain}:${app.port}/${app.dbName}`
  );
};
