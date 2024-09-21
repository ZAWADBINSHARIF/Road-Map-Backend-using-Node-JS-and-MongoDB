// external import
import mongoose from "mongoose";

const OTP_EXPIRE_TIME = 15;

const userOTP_Schema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, expires: `${OTP_EXPIRE_TIME}m`, default: () => new Date(Date.now() + OTP_EXPIRE_TIME * 60 * 1000) }
});


userOTP_Schema.pre('findOneAndUpdate', async function (next) {

    if (this.createdAt) {
        console.log("Updating expiration time");
        this.createdAt = new Date();
        this.expiresAt = new Date(Date.now() + OTP_EXPIRE_TIME * 60 * 1000);
    }
    next();
});

const UserOTP = mongoose.model('User_OTP', userOTP_Schema);

export default UserOTP;