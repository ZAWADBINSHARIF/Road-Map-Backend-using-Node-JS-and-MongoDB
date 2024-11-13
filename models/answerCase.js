import mongoose, { Types } from "mongoose";

const answerCaseSchema = mongoose.Schema({
    cases: [],
    total_marks: Number,
    percentage: Number,
    impressionResultPercentage: {},
    caseContainerName: String,
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


const AnswerCase = mongoose.model("answer_case", answerCaseSchema);
export default AnswerCase;