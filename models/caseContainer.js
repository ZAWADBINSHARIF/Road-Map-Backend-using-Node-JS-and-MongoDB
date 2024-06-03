// external import
import mongoose from "mongoose";


const caseContainerSchema = mongoose.Schema({
    caseContainerName: {
        type: String,
        required: true
    },
    cases: [{
        type: mongoose.Types.ObjectId,
        ref: "case"
    }],
    caseContainerLocation: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "branch"
    },
    problemList: [String],
});

const CaseContainer = mongoose.model('case_container', caseContainerSchema);
export default CaseContainer;