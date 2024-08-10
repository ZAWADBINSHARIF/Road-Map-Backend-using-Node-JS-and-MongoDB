// external import
import asyncHandler from 'express-async-handler';
import otpGenerator from 'otp-generator';
import * as nodemailer from "nodemailer";


// internal import
import User from '../models/User.js';
import createJWT from '../utilities/createJWT.js';
import sendOTP from '../utilities/sendOTP.js';
import UserOTP from '../models/UserOTP.js';



// @desc Auth Login
// route POST /api/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    console.log(email);
    if (user && await user.matchPassword(password)) {
        const jwtToken = await createJWT({ ...user["_doc"], password: null });
        return res.status(200).json({ token: jwtToken, userInfo: { ...user["_doc"], password: null } });
    } else {
        return res.status(401).json({ error: "User not authenticate" });
    }

});



// @desc OTP will send for verification
// route POST /api/otp
// @access Public
export const otpSender = asyncHandler(async (req, res) => {
    const { email, name } = req.body;
    const foundUser = await User.findOne({ email }).exec();

    try {

        if (!email && !name) {
            console.log('Email and Name are required');
            return res.status(400).json({ "error": 'Email and Name are required' });
        }

        if (foundUser) {
            console.log('Email already was used');
            return res.status(409).json({ "error": 'Email already was used' });
        }

        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        await sendOTP(email, name, OTP);
        await UserOTP.findOneAndUpdate(
            { email },
            { otp: OTP },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    } catch (error) {
        return res.status(400).json({ "error": error.msg });
    }

    res.status(200).json({ msg: "OTP has been sent successfully" });
});



// @desc OTP verifier
// route POST /api/otp/verifier
// @access Public
export const otpVerifier = asyncHandler(async (req, res) => {
    const { email, name, number, password, otp } = req.body;

    try {
        const found = await UserOTP.findOne({ email, otp });

        if (!found) {
            return res.status(403).json({ "error": 'Expired OTP' });
        }



        const newUser = new User({
            email, name, number, password
        });

        await newUser.save();
        await UserOTP.findOneAndDelete({ email, otp });

    } catch (error) {
        return res.status(400).json({ "error": error.msg });
    }

    res.status(201).json({ msg: "New user has been created" });

})

