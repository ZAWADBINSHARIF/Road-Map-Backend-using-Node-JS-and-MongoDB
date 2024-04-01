import express from "express";
import { authUser } from '../controllers/authController.js';
import JWT_verifier from "../middlewares/JWT_verifier.js";

const router = express.Router();

router.get('/verify', JWT_verifier);
router.post('/login', authUser);


export default router;