const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/Database-Dreamer',
{useNewUrlParser : true}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err.message);
})

app.listen(3000,()=>{console.log("server started");})