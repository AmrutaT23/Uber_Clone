const userModel = require('../models/user.model');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');

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
