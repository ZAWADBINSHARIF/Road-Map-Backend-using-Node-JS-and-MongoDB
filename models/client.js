// external import
import mongoose from "mongoose";


const clientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    profile_image: {
        type: String,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
    countryCodeAndFlag: {
        code: {
            type: String,
            default: "+93"
        },
        flag: {
            type: String,
            default: "🇦🇫"
        }
    },
    phone_number: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    education: {
        type: String,
        trim: true
    },
    specialty: {
        type: String,
        trim: true
    },
    country: {
        name: {
            type: String,
            default: "Afghanistan"
        },
        flag: {
            type: String,
            default: "🇦🇫"
        }
    },
    education: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});


const Client = mongoose.model('client', clientSchema);

export default Client;