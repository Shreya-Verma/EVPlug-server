/**
 * @author: Shreya Verma
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const constants = require('./src/constants');
const app = express();

//const authRoutes = require('./routes/authRoutes');
//const requireAuth = require('./middleware/requireAuth');

//DB
require('./src/dbconfig')();

app.use(cors());
//Return the response in the body as a json object
app.use(bodyParser.json());
//Add auth routes to app
//app.use('/evplug',authRoutes);
app.get('/',(req, resp)=>{
    resp.send("Hello from server")
})
//Make server available on port 3000
app.listen(constants.PORT, function(){
    console.log('Server running on localhost ' + constants.PORT);
})