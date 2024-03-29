// external import
import asyncHandler from 'express-async-handler';


// internal import
import User from '../models/User.js';
import { createJWT } from '../utilities/jwtHandler.js';



// @desc Auth Login
// route POST /api/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (user && await user.matchPassword(password)) {
        const jwtToken = await createJWT({ ...user["_doc"], password: null });
        return res.status(200).json({ token: jwtToken, userInfo: { ...user["_doc"], password: null } });
    } else {
        return res.status(400).json({ error: "User not authenticate" });
    }

});