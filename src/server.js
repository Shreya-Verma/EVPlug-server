/**
 * @author: Shreya Verma
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const constants = require('./constants');
const app = express();

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');

// Connect to database at mongo through mangoose
mongoose.connect(constants.MONGO_URI, (err)=>{
    if(err){
        console.error('Error!' + err);
    }else{
        console.log('Connected to MongoDB');
    }
});


app.use(cors());

//Return the response in the body as a json object
app.use(bodyParser.json());
//Add auth routes to app
app.use('/evplug',authRoutes);


//Make server available on port 3000
app.listen(constants.PORT, function(){
    console.log('Server running on localhost ' + constants.PORT);
})
