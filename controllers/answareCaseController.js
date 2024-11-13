// external import
import expressAsyncHandler from "express-async-handler";


// internal import
import User from "../models/User.js";
import AnswareCase from "../models/answareCase.js";
import Client from "../models/client.js";




// @decs For getting all answare cases for My list
// route GET /api/answareCase
// @access protected
export const getAllAnswareCases = expressAsyncHandler(async (req, res) => {

    const _id = req._id;

    const foundUser = await User.find({ _id, role: "user" }).populate("myList").exec();

    if (foundUser) {
        console.log(foundUser);
        return res.status(200).json(foundUser.myList);
    }

    const allAnswareCases = await AnswareCase.find();

    return res.status(200).json(allAnswareCases);

});



// @decs For posting answare case
// route POST /api/answareCase
// @access protected
export const addNewAnswareCase = expressAsyncHandler(async (req, res) => {

    const _id = req._id;
    const { answareCase, clientProfileDetails } = req.body;
    const answareCaseObj = JSON.parse(answareCase);
    const clientProfileDetailsObj = clientProfileDetails ? JSON.parse(clientProfileDetails) : null;

    console.log(answareCaseObj);
    console.log(clientProfileDetailsObj);

    try {

        const foundUser = await User.findById(_id).exec();

        if (!foundUser) {
            return res.status(404).json({ error: "User nat found" });
        }

        let newClient;
        if (clientProfileDetails) {
            newClient = await new Client({
                ...clientProfileDetailsObj,
                profile_image: req.body.profile_image
            });

            await newClient.save();
        }



        const newAnswareCase = await new AnswareCase({
            ...answareCaseObj,
            userId: foundUser._id,
            clientDetails: newClient ? newClient._id : null
        });

        await newAnswareCase.save();

        await User.findOneAndUpdate({ _id },
            {
                $addToSet: { myList: newAnswareCase._id }
            });

        return res.status(200).json("Answare case has been uploaded");

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }

});