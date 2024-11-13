// external import
import express from "express";

// internal import
import { addNewAnswareCase, getAllAnswareCases } from "../controllers/answareCaseController.js";
import JWT_verifier from "../middlewares/JWT_verifier.js";
import clientProfileImageUploader from "../middlewares/clientProfileImageUploader.js";


const router = express.Router();

// ** for Both
router.get("/", JWT_verifier(), getAllAnswareCases);

// ** for User
router.post("/", JWT_verifier("user"), clientProfileImageUploader, addNewAnswareCase);

export default router;