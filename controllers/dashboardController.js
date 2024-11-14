// external import
import asyncHandler from "express-async-handler";


// internal import
import User from "../models/User.js";
import Branch from "../models/branch.js";
import CaseContainer from "../models/caseContainer.js";
import AnswerCase from "../models/answerCase.js";



// @desc for getting dashboard info data
// route GET /api/dashboard
// @access public
export const getDashboardInfo = asyncHandler(async (req, res) => {

    const _id = req._id;

    try {
        const foundUser = await User.findById(_id).populate("myCases myList");


        if (foundUser.rule === "admin") {

            const totalUser = await User.countDocuments({});
            const list = await AnswerCase.countDocuments({});
            const totalCaseContainer = await CaseContainer.countDocuments({});
            const totalSection = await Branch.countDocuments({});
            console.log({ totalUser, list, totalCaseContainer, totalSection });
            return res.status(200).json({ totalUser, list, totalCaseContainer, totalSection });

        } else {
            const myCases = foundUser?.myCases?.filter(item => item.publish === true).length;
            const myList = foundUser?.myList.length;
            const totalCaseContainer = await CaseContainer.countDocuments({ publish: true });
            const totalSection = await Branch.countDocuments({ publish: true });
            console.log({ myCases, myList, totalCaseContainer, totalSection });
            return res.status(200).json({ myCases, myList, totalCaseContainer, totalSection });

        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }

});