const userModel = require('../models/user.model');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);

        const { fullname, email, password } = req.body;

        // ✅ Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });

    } catch (err) {
        // ✅ Optional: handle specific MongoDB duplicate key errors too
        if (err.code === 11000 && err.keyPattern?.email) {
            return res.status(400).json({ error: 'Email already registered (MongoDB)' });
        }

        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Optional: log to debug
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }



    
        const { email, password } = req.body;

        // ✅ Check if user exists
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // ✅ Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token) ;
        res.status(200).json({ token, user });

    }

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}    

module.exports.logoutUser = async (req, res, next) => {

    res.clearCookie('token');
    const token = req.cookies.token|| req.headers.authorization.split(' ')[1];

    await BlacklistToken({token});
        
    res.status(200).json({ message: 'Logged out successfully' });
    
}