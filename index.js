/**
 * @author: Shreya Verma
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; 	

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

app.listen(port, function(){
    console.log('Server running on localhost ' + port);
})
