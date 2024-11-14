// external import
import asyncHandler from "express-async-handler";


// internal import
import User from "../models/User.js";
import Branch from "../models/branch.js";
import CaseContainer from "../models/caseContainer.js";



// @desc for getting dashboard info data
// route GET /api/dashboard
// @access public
export const getDashboardInfo = asyncHandler(async (req, res) => {

    const _id = req._id;

    try {
        const foundUser = await User.findById(_id).populate("myCases myList");


        if (foundUser.rule === "admin") {


        } else {
            const myCases = foundUser?.myCases?.filter(item => item.publish === true).length;
            const myList = foundUser?.myList.length;
            const totalCases = await CaseContainer.countDocuments({ publish: true });
            const totalSection = await Branch.countDocuments({ publish: true });
            console.log({ myCases, myList, totalCases, totalSection });
            return res.status(200).json({ myCases, myList, totalCases, totalSection });

        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }

});