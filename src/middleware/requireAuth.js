/**
 * @author: Shreya Verma
 */
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Verify token for every request
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Unautorized Request" });
  }
  const token = authorization.replace("Bearer ", "");
  
  jwt.verify(token, "MY_SECRETKEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "Unautorized Request" });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
  
};
