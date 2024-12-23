// external import
import express from 'express';

// internal import
import userProfileImageUploader from "../middlewares/userProfileImageUploader.js";
import JWT_verifier from "../middlewares/JWT_verifier.js";
import { changeUserAccoutStatus, changeUserRole, getAllUser, getMyCases, getUserDetails, removingUser, updateUserDetails } from '../controllers/userController.js';


const router = express.Router();


router.get("/myCases", JWT_verifier("user"), getMyCases);
router.get("/all_user", JWT_verifier("admin"), getAllUser);
router.get("/", JWT_verifier(), getUserDetails);

router.put("/changeRole/:userId", JWT_verifier("admin"), changeUserRole);
router.put("/changeUserAccoutStatus/:userId", JWT_verifier("admin"), changeUserAccoutStatus);
router.put("/", JWT_verifier(), userProfileImageUploader, updateUserDetails);

router.delete("/removeUser/:userId", JWT_verifier("admin"), removingUser);


export default router;