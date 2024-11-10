// external import
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
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
        trim: true
    },
    email: {
        type: String,
        required: true,
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
    institutionName: {
        type: String,
        trim: true
    },
    myCases: [{
        type: mongoose.Types.ObjectId,
        ref: "case_container"
    }],
    favoriteCases: [{
        type: mongoose.Types.ObjectId,
        ref: "case_container"
    }],
    password: String,
    rule: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        console.log(error);
    }

    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('user', userSchema);

export default User;