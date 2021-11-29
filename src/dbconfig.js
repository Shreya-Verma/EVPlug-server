/**
 * @author: Shreya Verma
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { MONGO_URL_PROD } = process.env;

//Prod
const connectDB = () => {
  return mongoose
    .connect(MONGO_URL_PROD)
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log("Error connecting to db",err.message));
};


module.exports = connectDB;
