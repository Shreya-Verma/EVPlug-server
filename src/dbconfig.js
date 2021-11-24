/**
 * @author: Shreya Verma
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_PASSWORD } = process.env;

//Prod
// const connectDB = () => {
//   return mongoose
//     .connect(`mongodb://evplug:${DB_PASSWORD}@evplug.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@evplug@`)
//     .then(() => console.log(`database connected successfully`))
//     .catch((err) => console.log("Error connecting to db",err.message));
// };
const connectDB = () => {
  return mongoose
    .connect(`mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000`)
    .then(() => console.log(`database connected  to local successfully`))
    .catch((err) => console.log("Error connecting to db",err.message));
};



module.exports = connectDB;
