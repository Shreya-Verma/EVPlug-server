const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/UserDetails");
const UserDetails = mongoose.model("UserDetail");

//Cannot acces user details api without jwt authentication
router.use(requireAuth);

router.get("/details", async (req, res) => {
  try {
    const user = await UserDetails.find({ userId: req.user._id });
    if (!user) {
      return res.status(422).send({ error: "You haven't added any details!" });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    return res.status(422).send({ error: "Error fetching user details" });
  }
});

router.post("/update", async (req, res) => {
  
    const { firstName, lastName, phoneNumber } = req.body;
    const opts = { new: true, upsert: true };

    if (!firstName && !lastName && !phoneNumber) {
      return res
        .status(422)
        .send({ error: "You must provide details to update!" });
    }
    const phone = parseInt(phoneNumber);

    if (isNaN(phone) || phoneNumber.length > 10 || phoneNumber.length < 10) {
      return res
        .status(422)
        .send({ error: "Invalid Phone number: Format: 7685645657" });
    }
  try {
     const update = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone
     }
     const details = await UserDetails.findOneAndUpdate(
      { userId: req.user._id },
      update,
      opts
    );
    
    res.status(200).send(details);
  } catch (err) {
    return res.status(422).send({ error: "Error updating details!" });
  }
});

module.exports = router;
