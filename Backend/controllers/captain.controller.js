const CaptainModel = require('../models/captain.model');
const captainService = require('../Services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log("400 check");
    console.log(errors.array()); // ⬅️ Add this line
    return res.status(400).json({ errors: errors.array() });
}


    
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await CaptainModel.findOne({ email});
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    const hashPassword = await CaptainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}