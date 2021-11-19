/**
 * @author: Shreya Verma
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User  = require('../models/User');
const constants = require('../constants');
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRETKEY } = process.env;


//Require db connection
require('../dbconfig')();

mongoose.model('User');


// Register Users API
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRETKEY);
    res.status(200).send({ token });

  } catch (err) {
    return res.status(422).send(err.message);
  }
});


// Login API
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    if(!email || !password) {
        res.status(422).send({error: 'Must provide email and password'});
    }
    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error: 'Invalid password or email'});
    }

    try{
        await user.comparePassword(password);
        const payload = { userId: user._id };
        const token = jwt.sign(payload,JWT_SECRETKEY);
        res.status(200).send({ token });
        
    }catch(err){
        return res.status(422).send({error: 'Invalid password or email'});
    }
});


module.exports = router;
