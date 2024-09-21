// external import
import mongoose from "mongoose";


const caseContainerSchema = mongoose.Schema({
    caseContainerName: {
        type: String,
        required: true,
        trim: true
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
    createNextPage: {
        type: Boolean,
        required: true
    },
    problemList: [String],
    impression: [String],
    publish: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true
    }
);

const CaseContainer = mongoose.model('case_container', caseContainerSchema);
export default CaseContainer;