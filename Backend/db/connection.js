const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  const URL_cloud = process.env.DB_URL;
  await mongoose.connect(URL_cloud);
};

module.exports = connect;
