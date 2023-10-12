const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');


// @desc Register User
// @route POST api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User are already regestered");
    }

    //Hash password
    const hasspassword = await bcrypt.hash(password, 10);
    console.log("hashed Password: ", hasspassword);

    const user = await User.create({
        username,
        email,
        password:hasspassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user._id, email:user.email})
    }
    else{
        res.status(400)
        throw new Error("User data not valid");
    }
    res.json({message:"Register user"});
});

// @desc Login User
// @route POST api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if( !email, !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    if(email && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1m'}
        );
        res.status(200).json({accesstoken});
    } else{
        res.status(401);
        throw new Error("email or password are not valid");

    }
    res.json({message:"login user"});
});

// @desc Current user info
// @route GET api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message:"current user"});
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};
