// external import 
import fs from 'fs';
import path from "path";
import asyncHandler from 'express-async-handler';


// internal import
import User from "../models/User.js";




// @desc getting user's MyCases
// route get /api/user/myCases
// @access Protected
export const getMyCases = asyncHandler(async (req, res) => {
    const _id = req._id;

    const user = await User.findById(_id).populate("myCases").exec();
    console.log(user.myCases);
    return res.json(user.myCases);

});



// @desc getting user profile
// route get /api/user
// @access Protected
export const getUserDetails = asyncHandler(async (req, res) => {
    const _id = req._id;

    const user = await User.findById(_id).exec();

    return res.json({ userDetails: { ...user["_doc"], password: null } });

});



// @desc updating user profile
// route PUT /api/user
// @access Protected
export const updateUserDetails = asyncHandler(async (req, res) => {

    const {
        firstname,
        lastname,
        age,
        email,
        phone_number,
        specialty,
        city,
        institutionName,
        gender,
        education,
        countryCodeAndFlag,
        country,
        profile_image
    } = req.body;

    const _id = req._id;

    const foundUser = await User.findById(_id).exec();

    if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
    }

    const newProfileDetails = {
        firstname,
        lastname,
        age,
        email,
        phone_number,
        specialty,
        city,
        institutionName,
        gender,
        education
    };

    if (profile_image) {
        newProfileDetails.profile_image = profile_image;

        if (foundUser.profile_image) {

            const __dirname = import.meta.dirname;
            const currentImagePath = path.join(__dirname, "..", "public", "upload", foundUser.profile_image);

            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath);
            };

        }
    }

    if (countryCodeAndFlag) {
        newProfileDetails.countryCodeAndFlag = JSON.parse(countryCodeAndFlag);
    }

    if (country) {
        newProfileDetails.country = JSON.parse(country);
    }

    await User.findOneAndUpdate({ _id }, {
        ...newProfileDetails
    });


    res.status(200).json("User profile has been updated");

});