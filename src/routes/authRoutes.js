/**
 * @author: Shreya Verma
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("../models/User");

const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRETKEY, JWT_EXPIRATION } = process.env;

const User = mongoose.model("User");


const validateEmail = (email) => {
  const re = /^[a-z0-9A-Z]+@[a-z]+\.[a-z]{2,3}$/;
  
  return re.test(email);
}

const validatePassword = (password) =>{
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  return re.test(password);
}


/**
 * Creates a new user with an email and password.
 * @error auth/email-already-in-use Thrown if there already exists an account with the given email address.
 * @error auth/invalid-email Thrown if the email address is not valid.
 * @error auth/weak-password Thrown if the password is not strong enough.
 * @error auth/generic Thrown in case of other generic errors .
 * @param email The users email address.
 * @param password The users password.
 */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "auth/operation-not-allowed" });
  }

  if(!validateEmail(email)){
    return res.status(422).send({ error: "auth/invalid-email" });
  }

  if(!validatePassword(password)){
    return res.status(422).send({ error: "auth/weak-password" });
  }

  try {
    const user = new User({ email, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRETKEY, { expiresIn: JWT_EXPIRATION });
    res.status(200).send({ token , email});

  } catch (err) {
    if (JSON.stringify(err).includes(`"code":11000`)) {
      return res.status(422).send({ error: "auth/email-already-in-use" });
    }else{
      return res.status(422).send({ error: "auth/generic" });
    }
  }
});

/**
 * Signs a user in with an email and password.
 * @error auth/invalid-email Thrown if the email address is not valid.
 * @error auth/user-not-found Thrown if there is no user corresponding to the given email.
 * @error auth/wrong-password Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
 * @param email The users email address.
 * @param password The users password.
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "auth/operation-not-allowed" });
  }

  if(!validateEmail(email)){
    return res.status(422).send({ error: "auth/invalid-email" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
       return res.status(422).send({ error: "auth/user-not-found" });
    }
    
    await user.comparePassword(password);
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRETKEY, { expiresIn: JWT_EXPIRATION });
    res.status(200).send({ token , email});
  } catch (err) {
    return res.status(422).send({ error: "auth/wrong-password" });
  }

});

module.exports = router;
