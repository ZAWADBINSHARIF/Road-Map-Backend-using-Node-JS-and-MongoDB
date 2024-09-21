import express from "express";
import { authUser, otpSender, otpVerifier } from '../controllers/authController.js';
import JWT_verifier from "../middlewares/JWT_verifier.js";

const router = express.Router();

// ** Both
router.get('/verify', JWT_verifier);
router.post('/login', authUser);
router.post('/otp', otpSender);
router.post('/otp/verifier', otpVerifier);

export default router;