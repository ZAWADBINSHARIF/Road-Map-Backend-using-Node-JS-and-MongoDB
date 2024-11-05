import express from "express";
import { authUser, getUserDetails, otpSender, otpVerifier, updateUserDetails } from '../controllers/authController.js';
import JWT_verifier from "../middlewares/JWT_verifier.js";
import userProfileImageUploader from "../middlewares/userProfileImageUploader.js";

const router = express.Router();

// ** Both
router.get('/verify', JWT_verifier());
router.post('/login', authUser);
router.post('/otp', otpSender);
router.post('/otp/verifier', otpVerifier);
router.get("/user", JWT_verifier(), getUserDetails);
router.put("/user", userProfileImageUploader, JWT_verifier(), updateUserDetails);

export default router;