// external import
import mongoose from "mongoose";


const rootBranchSchema = mongoose.Schema({
    branch_ref: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "branch"
    }
});


const RootBranch = mongoose.model('root_branch', rootBranchSchema);

export default RootBranch;