// external import
import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
    information: String,
    question: {
        type: String,
        required: true,
    },
    date: String,
    note: String,
    impression: [String],
    fileName: String,
    frequency: {
        number: Number,
        time: {
            type: String,
            enum: ['Hour', 'Day', 'Week', 'Month', 'Year'],
        },
    },
    severity: String,
    startTime: String,
    finishTime: String,
    dropdowns_users: [String],
    caseLocation: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    pageNo: {
        type: Number,
        required: true
    },
});



const Case = mongoose.model('case', caseSchema);

export default Case;