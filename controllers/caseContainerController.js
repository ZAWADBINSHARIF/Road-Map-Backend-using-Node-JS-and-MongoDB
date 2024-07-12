// external import
import expressAsyncHandler from "express-async-handler";


// internal import
import Branch from "../models/branch.js";
import CaseContainer from "../models/caseContainer.js";
import Case from "../models/case.js";


// @desc For creating Case Container
// route POST /api/caseContainer
// @access private
export async function createCaseContainer(req, res) {
    const { caseContainerName, caseContainerLocation, problemList, createNextPage } = req.body;

    try {

        if (caseContainerName && caseContainerLocation) {
            Error("caseContainerName and caseContainerLocation not founded");
        }

        const newCaseContainer = await new CaseContainer({
            caseContainerName,
            caseContainerLocation,
            problemList,
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
// route POST /api/caseContainer/:caseContainerId
// @access private
export const removeCaseContainer = expressAsyncHandler(async (req, res) => {

    const caseContainerId = req.params.caseContainerId;

    try {

        const removedCaseContainer = await CaseContainer.findOneAndDelete({ _id: caseContainerId }); // 6688fd70bf5fd2a44d5ad32a

        if (!removedCaseContainer) {
            res.status(404).json({ 'error': "Case Container not found" });
            return;
        }

        // Now delete all cases associated with the removed caseContainer
        await Case.deleteMany({ _id: { $in: removedCaseContainer.cases } });
        res.status(200).json({ 'msg': 'Case Container has been deleted' });


    } catch (error) {
        console.log(error);
        res.status(500).json({ 'error': error.message });
    }


});