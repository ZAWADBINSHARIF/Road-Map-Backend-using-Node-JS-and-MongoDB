// external import
import mongoose from "mongoose";

const branchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    branches: [{
        type: mongoose.Types.ObjectId,
        ref: 'branch'
    }],
    cases: [{
        type: mongoose.Types.ObjectId,
        ref: 'case'
    }]
});


const Branch = mongoose.model('branch', branchSchema);

export default Branch;