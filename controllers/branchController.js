// external import
import expressAsyncHandler from "express-async-handler";


// internal import
import Branch from "../models/branch.js";
import RootBranch from "../models/rootBranch.js";



// @desc rename branche
// route DELTE /api/branch/remove?branch_id
// @access Private
export const removeBranch = expressAsyncHandler(async (req, res) => {
    const { branch_id } = req.query;

    try {

        const branchFounded = await Branch.find({
            $and: [
                { _id: branch_id },
                { branches: { $size: 0 } },
                { caseContainers: { $size: 0 } },
            ],
        });


        if (branchFounded.length > 0) {
            const removingID = branchFounded[0]._id;

            await Branch.findOneAndDelete({ _id: removingID });

            if (branchFounded[0].branchLocation !== null) {
                await Branch.findOneAndUpdate(
                    { branches: { $in: [removingID] } },
                    {
                        $pull: {
                            branches: removingID
                        }
                    }
                );
            } else {
                await RootBranch.findOneAndDelete({ branch_ref: removingID });
            }

        } else {
            return res.status(406).json({ error: "The Section is not allowed to remove" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }


    res.status(200).json({ msg: "Section has been deleted" });

});


// @desc rename branche
// route POST /api/branch/update_branch?branch_id
// @access Private
export const updateBranch = expressAsyncHandler(async (req, res) => {
    const { branch_id } = req.query;
    const { newName: name, publish } = req.body;

    if (!branch_id)
        return res.status(400).json({ error: "Branch ID name is not valid" });
    try {
        await Branch.findOneAndUpdate({ _id: branch_id }, { name, publish });
        res.status(200).json({ msg: "Branch has been changed" });
    } catch (error) {
        console.log(error);
        res.json(500).json({ error: error.message });
    }

});


// @desc get branches for an user
// route POST /api/branch/get_branch_for_user?location_id=/
// @access Public
export const getBranchForUser = expressAsyncHandler(async (req, res) => {
    const { location_id } = req.query;


    if (!location_id)
        res.status(400).json({ error: "Location ID is not valid" });


    if (location_id === '/') {
        const data = await RootBranch.find().select("branch_ref -_id").lean().populate("branch_ref");
        let allRootBranches = data.map(item => item.branch_ref);
        let branches = allRootBranches.filter(item => item.publish && item?.publish === true);

        return res.status(200).json({ branches: branches });
    } else {
        const data = await Branch.find({ _id: location_id }).select("branches _id caseContainers").lean().populate("branches caseContainers");
        const branches = data.map(item => {
            if (item.branches) {
                return item.branches.filter(item => item.publish && item?.publish === true);
            }
        });
        const caseContainers = data.map(item => {
            if (item.caseContainers) {
                return item.caseContainers.filter(item => item.publish === true);

            }
        });
        return res.status(200).json({ branches: branches[0], caseContainers: caseContainers[0] });
    }
});


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

        // ** if this branch location is root then don't need to set branchLocation field
        // ** otherwise set branchLocation field

        if (location_id === '/') {

            const newRootBranch = await new RootBranch({
                branch_ref: newBranch._id,
            });

            newRootBranch.save();

            console.log(newRootBranch);
        } else {

            newBranch.branchLocation = location_id;

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
// route GET /api/branch/get_branch?location_id=/
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