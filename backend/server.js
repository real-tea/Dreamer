const express = require('express');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pins')
const UserRoute = require('./routes/User')

const bodyParser = require("body-parser")

const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://127.0.0.1:27017/Database-Dreamer',
{useNewUrlParser : true}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err.message);
})

app.use("/api/users",UserRoute)

app.use("/api/pins",pinRoute);

app.listen(4000,()=>{console.log("server started");})
