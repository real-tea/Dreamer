const router = require('express').Router();
const Pin = require('../models/Pin.js')


router.post('/',async (req,res) => {
    const newPin = new Pin(req.body)
    try{
        const SavePin = await newPin.save();
        res.status(200).json(SavePin)

    }catch(err){
        res.status(500).json({message: err.message})
    }


})

module.exports = router;