// external import
import express from "express";

// internal import
import { addNewAnswerCase, getAllAnswerCases, removeSingleAnswerCases } from "../controllers/answerCaseController.js";
import JWT_verifier from "../middlewares/JWT_verifier.js";
import clientProfileImageUploader from "../middlewares/clientProfileImageUploader.js";


const router = express.Router();

// ** for Both
router.get("/", JWT_verifier(), getAllAnswerCases);
router.delete("/:answerCaseId", JWT_verifier(), removeSingleAnswerCases);

// ** for User
router.post("/", JWT_verifier("user"), clientProfileImageUploader, addNewAnswerCase);

export default router;