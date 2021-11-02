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
    },
    description: {
        type : String,
        require : true,
        min : 3
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
})

module.exports = mongoose.model("Pin",Pin)