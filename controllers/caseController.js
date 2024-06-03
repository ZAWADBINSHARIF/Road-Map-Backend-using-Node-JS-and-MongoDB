// internal import
import Case from '../models/case.js';
import CaseContainer from '../models/caseContainer.js';



export async function addCase(req, res) {
    const {
        information,
        question,
        date,
        note,
        impression,
        fileName,
        frequency,
        severity,
        startTime,
        finishTime,
        dropdowns_users,
        pageNo,
        caseContainerId
    } = req.body;

    try {

        const newCase = await new Case({
            information,
            question,
            date,
            note,
            impression,
            fileName,
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