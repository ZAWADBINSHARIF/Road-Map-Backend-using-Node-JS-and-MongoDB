import mongoose, { Types } from "mongoose";

const answareCaseSchema = mongoose.Schema({
    cases: [],
    total_marks: Number,
    percentage: Number,
    impressionResultPercentage: {},
    clientDetails: {
        type: mongoose.Types.ObjectId,
        ref: "client"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
},
    {
        timestamps: true
    }
);


const AnswareCase = mongoose.model("answare_case", answareCaseSchema);
export default AnswareCase;