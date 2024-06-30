// internal import
import Branch from "../models/branch.js";
import CaseContainer from "../models/caseContainer.js";



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