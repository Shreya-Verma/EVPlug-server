/**
 * @author: Shreya Verma
 */
 const mongoose = require('mongoose');

 const favouritesSchema = new mongoose.Schema({
     userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     fav: [Number]
 });

 mongoose.model('Favourite', favouritesSchema)