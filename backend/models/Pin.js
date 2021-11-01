const mongoose = require('mongoose');

const Pin = new mongoose.Schema({
    userName : {
        type : String,
        require : true,
        unique: true
    },
    title : {
        type : String,
        require : true,
        unique: true
    },
    title : {
        type : String,
        require : true,
        unique: true
    },
    rating : {
        type : Number , 
        min : 0,
        max : 5,
        require : true
    },
    lat : {
        type : Number,
        require : true
    },
    long : {
        type : Number,
        require : true
    }
},{timestamp : true})

module.exports = new mongoose('Pins-model',Pin); 