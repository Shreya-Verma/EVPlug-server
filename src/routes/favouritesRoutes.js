const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
require("../models/Favourite");

const Favourite = mongoose.model('Favourite');

const router = express.Router();

router.use(requireAuth);

router.get('/getFav', async (req, res) => {
  try{
    const favs = await Favourite.find({ userId: req.user._id });
    res.send(favs);
  }catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/addFav', async (req, res) => {
  const { ocmid } = req.body;
  try {
   
    const opts = { new: true, upsert: true };
    const fav = await Favourite.findOneAndUpdate({userId: req.user._id},{$push:{fav: ocmid}},opts);
    res.send(fav);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/remove', async (req, res) => {
    const { ocmid } = req.body;
    try {
     const opts = { new: true, upsert: true };
     const fav =  await Favourite.findOneAndUpdate({userId: req.user._id},{$pull:{fav: ocmid}}, opts);
      res.send(fav);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  });



module.exports = router;
