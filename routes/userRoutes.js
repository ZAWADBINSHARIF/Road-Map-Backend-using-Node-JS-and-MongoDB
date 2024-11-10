// external import
import express from 'express';

// internal import
import userProfileImageUploader from "../middlewares/userProfileImageUploader.js";
import JWT_verifier from "../middlewares/JWT_verifier.js";
import { getMyCases, getUserDetails, updateUserDetails } from '../controllers/userController.js';


const router = express.Router();


// ** For user
router.get("/", JWT_verifier("user"), getUserDetails);
router.put("/", JWT_verifier("user"), userProfileImageUploader, updateUserDetails);
router.get("/myCases", JWT_verifier("user"), getMyCases);


export default router;