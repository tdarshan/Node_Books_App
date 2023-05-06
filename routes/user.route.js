const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

const { signAccessToken } = require('../jwt');


router.post('/register', async(req, res) => {

    try {

        const {email, password} = req.body;

        const isExists = await User.findOne({email});

        if(isExists){
            res.status(409).send({err: "User already exists"});
        }

        const newUser = new User({email: email, password: password});
        const savedUser = await newUser.save();



        const accessToken = await signAccessToken(savedUser.id);

        res.send({accessToken});

    } catch (error) {
        res.status(500).send({error});
        // console.error(error);
    }
});


router.post('/login', async(req, res) => {

    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.status(404).send({err: "User not found"});
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            res.status(404).send({err: "Password not match"});
        }

        const accessToken = await signAccessToken(user.id);


        res.send({accessToken})
    } catch (error) {
        return new Error("Internal server error");
    }
});


module.exports = router;