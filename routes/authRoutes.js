import express from "express";
import { authUser } from "../controllers/authController.js";
import { verifyJWT } from "../utilities/jwtHandler.js";


const router = express.Router();

router.get('/verify', verifyJWT)
router.post('/login', authUser);


export default router;