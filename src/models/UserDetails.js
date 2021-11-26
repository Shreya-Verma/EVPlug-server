/**
 * @author: Shreya Verma
 */
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        default: null
    },
    lastName:{
        type: String,
        default: null
    },
    phoneNumber:{
        type: Number,
        default: 0
    }
});

mongoose.model('UserDetail', userDetailsSchema)