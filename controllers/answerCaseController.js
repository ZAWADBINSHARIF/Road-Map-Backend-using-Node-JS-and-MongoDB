// external import
import expressAsyncHandler from "express-async-handler";


// internal import
import User from "../models/User.js";
import AnswerCase from "../models/answerCase.js";
import Client from "../models/client.js";




// @desc For getting all answer cases for My list
// @route GET /api/answerCase
// @access protected
export const getAllAnswerCases = expressAsyncHandler(async (req, res) => {
    const _id = req._id;

    try {
        const foundUsers = await User.find({ _id, rule: "user" }).populate("myList").exec();

        if (foundUsers && foundUsers.length > 0) {
            return res.status(200).json(foundUsers[0].myList);
        }

        const allAnswerCases = await AnswerCase.find().populate("userId clientDetails");

        console.log(allAnswerCases);

        return res.status(200).json(allAnswerCases);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});




// @decs For posting answare case
// route POST /api/answareCase
// @access protected
export const addNewAnswerCase = expressAsyncHandler(async (req, res) => {

    const _id = req._id;
    const { answareCase, clientProfileDetails, caseContainerName } = req.body;
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



        const newAnswareCase = await new AnswerCase({
            ...answareCaseObj,
            userId: foundUser._id,
            clientDetails: newClient ? newClient._id : null,
            caseContainerName
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