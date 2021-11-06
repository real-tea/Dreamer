const express = require('express');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pins')

const bodyParser = require("body-parser")

const app = express();
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost/Database-Dreamer',
{useNewUrlParser : true}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err.message);
})

app.use("/api/pins",pinRoute);

app.listen(3000,()=>{console.log("server started");})
