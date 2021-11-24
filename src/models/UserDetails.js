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
        default: ''
    },
    lastName:{
        type: String,
        default: ''
    },
    phoneNumber:{
        type: Number,
        default: 0
    }
});

mongoose.model('UserDetail', userDetailsSchema)