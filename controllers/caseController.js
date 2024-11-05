// external import
import fs from 'fs';
import path from 'path';


// internal import
import expressAsyncHandler from 'express-async-handler';
import Case from '../models/case.js';
import CaseContainer from '../models/caseContainer.js';



// @desc For removing Case
// route DELETE /api/case/:caseId
// @access private
export const removeCase = expressAsyncHandler(async (req, res) => {

    const { caseId } = req.params;

    try {

        const removedCase = await Case.findOneAndDelete({ _id: caseId });
        const case_container_id = removedCase.caseLocation;

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

        if (case_container_id) {

            // removed_Case_Id_Ref_From_Case_Container
            await CaseContainer.findOneAndUpdate({ _id: case_container_id }, {
                $pull: {
                    cases: removedCase._id
                }
            });

        }

        res.status(200).json({ msg: "Case componet has been deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }


});



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
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId,
        mediaFiles,
    } = req.body;

    if (frequency) frequency = JSON.parse(frequency);
    if (!dropdowns_users) dropdowns_users = [];
    if (!mediaFiles) mediaFiles = [];

    // console.log({
    //     id,
    //     information,
    //     question,
    //     date,
    //     note,
    //     frequency,
    //     severity,
    //     startTime,
    //     finishTime,
    //     dropdowns_users,
    //     pageNo,
    //     caseContainerId,
    //     mediaFiles,
    // });


    try {

        await Case.findOneAndUpdate({ _id: caseId }, {
            id,
            information,
            question,
            date,
            note,
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
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId,
        mediaFiles,
    } = req.body;

    if (frequency) frequency = JSON.parse(frequency);
    if (!mediaFiles) mediaFiles = [];
    if (!dropdowns_users) dropdowns_users = [];
    else dropdowns_users = JSON.parse(dropdowns_users);

    try {

        const newCase = await new Case({
            id,
            information,
            question,
            date,
            note,
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

        res.status(201).json({ message: 'New case has been added' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

}

