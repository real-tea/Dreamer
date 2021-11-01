const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    userName : {
        type : String,
        require : true,
        unique: true
    },
    email : {
        type : String,
        require : true,
        unique : true 
    },
    password : {
        type : String,
        require : true
    }  
},
{timestamps : true})

module.exports = new mongoose.Model('User-info-model',newUser);

