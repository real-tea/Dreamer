const mongoose = require('mongoose');

const newUser = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique: true
    },
    email : {
        type : String,
        required : true,
        unique : true 
    }
})

