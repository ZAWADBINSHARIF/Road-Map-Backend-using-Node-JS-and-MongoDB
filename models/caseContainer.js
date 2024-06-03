// external import
import mongoose from "mongoose";


const caseContainerSchema = mongoose.Schema({
    caseContainerName: {
        type: String,
        required: true
    },
    cases: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "case"
    }],
    caseLocation: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "branch"
    },
    problemList: [String],
});

const caseContainer = mongoose.model('caseContainer', caseContainerSchema);
export default caseContainerModel;