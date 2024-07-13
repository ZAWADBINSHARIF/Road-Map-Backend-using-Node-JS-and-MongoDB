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
    impression: [String],
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
        trim: true
    },
    startTime: String,
    finishTime: String,
    dropdowns_users: [],
    caseLocation: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    pageNo: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});


caseSchema.pre('deleteMany', async function (next) {
    console.log("remove");

    console.log(this);

});


const Case = mongoose.model('case', caseSchema);

export default Case;