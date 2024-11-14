// external import
import express from 'express';

// internal import
import userProfileImageUploader from "../middlewares/userProfileImageUploader.js";
import JWT_verifier from "../middlewares/JWT_verifier.js";
import { changeUserRole, getAllUser, getMyCases, getUserDetails, updateUserDetails } from '../controllers/userController.js';


const router = express.Router();


router.get("/myCases", JWT_verifier("user"), getMyCases);
router.get("/all_user", JWT_verifier("admin"), getAllUser);
router.get("/", JWT_verifier(), getUserDetails);

router.put("/", JWT_verifier("user"), userProfileImageUploader, updateUserDetails);
router.put("/changeRole/:userId", JWT_verifier("admin"), changeUserRole);

router.delete("/removeUser/:userId", JWT_verifier("admin"));


export default router;