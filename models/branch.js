// external import
import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    branchLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'branch'
    },
    branches: [{
        type: mongoose.Types.ObjectId,
        ref: 'branch'
    }],
    caseContainers: [{
        type: mongoose.Types.ObjectId,
        ref: 'case_container'
    }],
    publish: {
        type: Boolean,
        required: true,
        default: false
    }
});


const Branch = mongoose.model('branch', branchSchema);

export default Branch;