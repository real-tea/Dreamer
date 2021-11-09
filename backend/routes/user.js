const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')


//Registration

router.post('/register',async (req,res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        //creating new User
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
        });

        //save User and Password
        const user = await newUser.save();
        res.status(200).json(user._id);
        }catch(err){
            console.log(err)
            res.status(500).json(err);
    }
})

//Login the user

router.post('/login', async (req, res) => {
    try{
        //find user 
        const user = await User.findOne({ username : req.body.username})
        !user && res.status(400).json("wrong username");//username not found



        //validate password 
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong username or wrong password"); //password is wrong

        //send response             
        res.status(200).json({_id : user._id , username : user.username})
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;

