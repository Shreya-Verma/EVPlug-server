const express = require("express");
const requireAuth = require('../middleware/requireAuth');
const mongoose = require("mongoose");
const router = express.Router();
require('../models/UserDetails');
const UserDetails = mongoose.model('UserDetail');

//Cannot acces user details api without jwt authentication
router.use(requireAuth);

router.get('/details', async (req, res) => {
    const user = await UserDetails.find({ userId: req.user._id });
    if(!user){
        res.status(422).send({ error: 'No user details added'});
    }else{
        res.status(200).send(user);
    }
   
});

router.post('/update', async (req, res) => {
    const { firstName, lastName, phoneNumber} = req.body;
  
    if (!firstName && !lastName && !phoneNumber) {
      return res.status(422).send({ error: 'You must provide details to update!'});
    }
  
    try {
      const details = new UserDetails({ firstName, lastName, phoneNumber ,userId: req.user._id });
      await details.save();
      res.status(200).send(details);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });


module.exports = router;
