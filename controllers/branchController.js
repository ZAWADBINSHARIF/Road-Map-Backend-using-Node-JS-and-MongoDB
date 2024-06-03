// external import
import expressAsyncHandler from "express-async-handler";


// internal import
import Branch from "../models/branch.js";
import RootBranch from "../models/rootBranch.js";




// @desc create new branch
// route POST /api/branch/create_new_branch
// @access Private
export const createNewBranch = expressAsyncHandler(async (req, res) => {

    const { name, location_id } = req.body;
    if (!name && !location_id)
        return new Error("Name and Location ID is not valid");

    const newBranch = await new Branch({
        "name": name
    });

    try {

        if (location_id === '/') {

            const newRootBranch = await new RootBranch({
                branch_ref: newBranch._id
            });

            newRootBranch.save();

            console.log(newRootBranch);
        } else {


            await Branch.findOneAndUpdate(
                { _id: location_id },
                {
                    $push: {
                        branches: newBranch._id
                    }
                }
            );

        }

        await newBranch.save();

        res.status(201).json({ "msg": "New branch has been created" });
    } catch (error) {
        res.status(500).json({ "error": error });
    }

});



// @desc get branch
// route POST /api/branch/get_branch?location_id=/
// @access Private
export const getBranch = expressAsyncHandler(async (req, res) => {

    const { location_id } = req.query;


    if (!location_id)
        res.status(400).json({ error: "Location ID is not valid" });


    if (location_id === '/') {
        const data = await RootBranch.find().select("branch_ref -_id").lean().populate("branch_ref");
        let allRootBranches = data.map(item => item.branch_ref);

        return res.status(200).json({ branches: allRootBranches });
    } else {
        const data = await Branch.find({ _id: location_id }).select("branches _id caseContainers").lean().populate("branches caseContainers");
        const branches = data.map(item => item.branches);
        const caseContainers = data.map(item => item.caseContainers);

        return res.status(200).json({ branches: branches[0], caseContainers: caseContainers[0] });
    }
});