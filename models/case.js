// external import
import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    information: {
        type: String,
        trim: true
    },
    question: {
        type: String,
        required: true,
    },
    date: String,
    note: {
        type: String,
        trim: true
    },
    mediaFiles: [],
    frequency: {
        number: Number,
        time: {
            type: String,
            enum: ['Hour', 'Day', 'Week', 'Month', 'Year'],
        },
    },
    severity: {
        type: String,
    },
    startTime: String,
    finishTime: String,
    dropdowns_users: [],
    caseLocation: {
        type: mongoose.Types.ObjectId,
        ref: "case_container",
        required: true,
    },
    pageNo: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});


const Case = mongoose.model('case', caseSchema);

export default Case;