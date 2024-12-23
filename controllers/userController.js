// external import 
import fs from 'fs';
import path from "path";
import asyncHandler from 'express-async-handler';


// internal import
import User from "../models/User.js";



// @desc For removing User
// route DELETE /api/user/removeUser/:userId
// @access Protected
export const removingUser = asyncHandler(async (req, res) => {

    const ownId = req._id;
    const { userId } = req.params;

    if (ownId == userId) {
        return res.status(401).json({ error: "You can't do this" });
    }

    try {

        const removedUser = await User.findOneAndDelete({ _id: userId });

        if (removedUser.profile_image) {

            const __dirname = import.meta.dirname;
            const currentImagePath = path.join(__dirname, "..", "public", "upload", removedUser.profile_image);

            if (fs.existsSync(currentImagePath)) {
                fs.unlinkSync(currentImagePath);
            };

        }

        return res.status(200).json("User role has been updated");

    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "Somthing went wrong" });
    }
});




// @desc For changing User's account status
// route PUT /api/user/changeUserAccoutStatus/:userId
// @access Protected
export const changeUserAccoutStatus = asyncHandler(async (req, res) => {

    const ownId = req._id;
    const { userId } = req.params;
    const { accountStatus } = req.body;

    if (ownId == userId) {
        return res.status(401).json({ error: "You can't do this" });
    }

    try {

        await User.findOneAndUpdate({ _id: userId }, {
            accountStatus
        });
        console.log(accountStatus);
        return res.status(200).json("User's account status has been updated");

    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "Somthing went wrong" });
    }
});



// @desc For changing User's role
// route PUT /api/user/changeRole/:userId
// @access Protected
export const changeUserRole = asyncHandler(async (req, res) => {

    const ownId = req._id;
    const { userId } = req.params;
    const { newRole } = req.body;

    if (ownId == userId) {
        return res.status(401).json({ error: "You can't do this" });
    }

    try {

        await User.findOneAndUpdate({ _id: userId }, {
            rule: newRole
        });

        return res.status(200).json("User role has been updated");

    } catch (error) {
        console.log(error);

        return res.status(500).json({ error: "Somthing went wrong" });
    }
});



// @desc For getting all User info
// route GET /api/user/all_user
// @access Protected
export const getAllUser = asyncHandler(async (req, res) => {

    try {
        const user = await User.find().select('-password').exec();

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error });
    }


});




// @desc getting user's MyCases
// route get /api/user/myCases
// @access Protected
export const getMyCases = asyncHandler(async (req, res) => {
    const _id = req._id;

    try {
        const user = await User.findById(_id).populate("myCases").exec();
        const filterThePublishedCases = user?.myCases?.filter(item => item.publish === true);

        return res.json(filterThePublishedCases);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": error });
    }


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