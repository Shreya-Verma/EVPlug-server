/**
 * @author: Shreya Verma
 */
const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    coords: {
        latitude: Number,
        longitude: Number
    }
});

const userDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName:{
        type: String,
        default: ''
    },
    favourites: [favouritesSchema]
});

mogoose.model('UserDetails', userDetailsSchema)