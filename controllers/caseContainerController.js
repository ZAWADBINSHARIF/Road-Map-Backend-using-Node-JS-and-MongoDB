// external import
import expressAsyncHandler from "express-async-handler";
import fs from "fs";


// internal import
import Branch from "../models/branch.js";
import CaseContainer from "../models/caseContainer.js";
import Case from "../models/case.js";
import path from "path";
import User from "../models/User.js";




// @desc For getting all published CaseContainers
// route GET /api/caseContainer/
// @access Protected
export const getAllCaseContainers = expressAsyncHandler(async (req, res) => {

    const foundUser = await User.findById(req._id).exec();

    const allCasesContainer = await CaseContainer.find().exec();

    const allPublishedCaseContainers = await CaseContainer.find({ publish: true }).exec();
    console.log(allPublishedCaseContainers);

    return res.status(200).json(foundUser.rule === "admin" ? allCasesContainer : allPublishedCaseContainers);
});




// @desc fetch cases from case container
// route GET /api/caseContainer/:caseContainerId
// @access public
export async function getCaseContainer(req, res) {
    const caseContainerId = req.params?.caseContainerId;

    try {
        const foundCaseContainer = await CaseContainer.findOne({ _id: caseContainerId }).populate('cases').exec();

        if (!foundCaseContainer) {
            return res.status(404).json({ error: "Cases not found" });
        }

        res.status(200).json(foundCaseContainer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

}



// @desc For Publishing or Unpublishing Case Container
// route POST /api/caseContainer/publish_unpublish/:caseContainerId
// @access private
export const publishOrUnpublishCaseContainer = expressAsyncHandler(async (req, res) => {
    const caseContainerId = req.params.caseContainerId;

    try {
        const caseContainer = await CaseContainer.findOne({ _id: caseContainerId });

        if (!caseContainer) {
            res.status(404).json({ message: "Case container not found" });
            return;
        }

        caseContainer.publish = !caseContainer.publish;
        await caseContainer.save();

        res.status(200).json({ "msg": "Case Container has been published: " + caseContainer.publish });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': error.message });
    }

});


// @desc For updating Case Container
// route PUT /api/caseContainer/:caseContainerId
// @access private
export const updateCaseContainer = expressAsyncHandler(async (req, res) => {
    const caseContainerId = req.params.caseContainerId;
    const { caseContainerName, caseContainerLocation, problemList, impression, createNextPage, showImpression } = req.body;

    if (caseContainerName && caseContainerLocation) {
        Error("caseContainerName and caseContainerLocation not founded");
    }

    await CaseContainer.findOneAndUpdate({ _id: caseContainerId }, {
        caseContainerName, caseContainerLocation, problemList, impression, createNextPage, showImpression
    });


    res.status(200).json({ "msg": "Case Container has been updated" });

});


// @desc For creating Case Container
// route POST /api/caseContainer
// @access private
export async function createCaseContainer(req, res) {
    const { caseContainerName, caseContainerLocation, problemList, createNextPage, impression, showImpression } = req.body;

    try {

        if (caseContainerName && caseContainerLocation) {
            Error("caseContainerName and caseContainerLocation not founded");
        }

        const newCaseContainer = await new CaseContainer({
            caseContainerName,
            caseContainerLocation,
            problemList,
            impression,
            showImpression,
            createNextPage
        });

        await newCaseContainer.save();
        await Branch.findOneAndUpdate(
            { _id: caseContainerLocation },
            {
                $push: {
                    caseContainers: newCaseContainer._id
                }
            }
        );


        res.status(201).json({ caseContainerId: newCaseContainer._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error.message });
    }

}


// @desc For removing Case Container
// route DELETE /api/caseContainer/:caseContainerId
// @access private
export const removeCaseContainer = expressAsyncHandler(async (req, res) => {

    const caseContainerId = req.params.caseContainerId;

    try {

        const removedCaseContainer = await CaseContainer.findOneAndDelete({ _id: caseContainerId });

        if (!removedCaseContainer) {
            res.status(404).json({ 'error': "Case Container not found" });
            return;
        }
        console.log(removedCaseContainer.caseContainerLocation);

        // Now delete all cases associated with the removed caseContainer

        for (let index in removedCaseContainer.cases) {

            const removedCase = await Case.findOneAndDelete({ _id: removedCaseContainer.cases[index] });

            if (removedCase?.mediaFiles) {

                for (let i in removedCase?.mediaFiles) {
                    const filepath = removedCase?.mediaFiles[i]?.uri;
                    const __dirname = import.meta.dirname;

                    try {
                        await fs.unlinkSync(path.join(__dirname, "..", "public", "upload", filepath));
                    } catch (error) {
                        console.log(error);
                    }

                }

            }
        }
        // const removedCases = await Case.deleteMany({ _id: { $in: removedCaseContainer.cases } });


        // Now case container id has been removed from the Branch
        await Branch.findOneAndUpdate({ _id: removedCaseContainer.caseContainerLocation }, {
            $pull: {
                caseContainers: caseContainerId
            }
        });

        res.status(200).json({ 'msg': 'Case Container has been deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': error.message });
    }


});