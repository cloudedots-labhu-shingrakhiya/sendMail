const mongoose = require("mongoose");
const config = require('../config.json');

module.exports = {
    connect: function () {
        let db = mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        mongoose.Promise = global.Promise;
    }
   // initModels: function () {
     //   require('../models');
    // }
};