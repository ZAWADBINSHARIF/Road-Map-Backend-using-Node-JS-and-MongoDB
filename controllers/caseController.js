// internal import
import Case from '../models/case.js';
import CaseContainer from '../models/caseContainer.js';


// @desc fetch cases from case container
// route GET /api/case/caseContainerId
// @access public
export async function getCases(req, res) {
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

// @desc adding single case/componet/string
// route POST /api/case
// @access private
export async function addCase(req, res) {
    let {
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
    console.log("Media File");
    console.log(mediaFiles);
    try {

        const newCase = await new Case({
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

        res.status(201).json({ message: 'New case has been added' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }

}

