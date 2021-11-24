/**
 * @author: Shreya Verma
 */
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRETKEY } = process.env;

//Verify token for every request
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "auth/invalid-header" });
  }
  const token = authorization.replace("Bearer ", "");
  
  jwt.verify(token, JWT_SECRETKEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "auth/Invalid-token" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
  
};
