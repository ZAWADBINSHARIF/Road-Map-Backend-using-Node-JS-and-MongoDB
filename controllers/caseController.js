// internal import
import expressAsyncHandler from 'express-async-handler';
import Case from '../models/case.js';
import CaseContainer from '../models/caseContainer.js';




// @desc For updating Case
// route POST /api/case/:caseId
// @access private
export const updateCase = expressAsyncHandler(async (req, res) => {

    console.log(req.body);

    const caseId = req.params?.caseId;
    let {
        id,
        information,
        question,
        date,
        note,
        impression,
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId,
        mediaFiles,
    } = req.body;
    if (!impression) impression = [];
    if (!dropdowns_users) dropdowns_users = [];
    if (!mediaFiles) mediaFiles = [];

    console.log({
        id,
        information,
        question,
        date,
        note,
        impression,
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId,
        mediaFiles,
    });
    try {

        await Case.findOneAndUpdate({ _id: caseId }, {
            id,
            information,
            question,
            date,
            note,
            impression,
            mediaFiles,
            frequency,
            severity,
            startTime,
            finishTime,
            dropdowns_users,
            caseLocation: caseContainerId,
            pageNo
        });

        res.status(200).json({ message: 'Case has been updated' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


});



// @desc adding single case/componet/string
// route POST /api/case
// @access private
export async function addCase(req, res) {
    let {
        id,
        information,
        question,
        date,
        note,
        impression,
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId,
        mediaFiles,
    } = req.body;

    if (!impression) impression = [];
    if (!dropdowns_users) dropdowns_users = [];
    if (!mediaFiles) mediaFiles = [];

    try {

        const newCase = await new Case({
            id,
            information,
            question,
            date,
            note,
            impression,
            mediaFiles,
            frequency,
            severity,
            startTime,
            finishTime,
            dropdowns_users,
            caseLocation: caseContainerId,
            pageNo
        });

        await newCase.save();
        await CaseContainer.findOneAndUpdate(
            { _id: caseContainerId },
            {
                $push: {
                    cases: newCase._id
                }
            }
        );
        console.log("case added");
        res.status(201).json({ message: 'New case has been added' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

}

