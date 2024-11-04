// external import
import express from 'express';

// internal import
import caseFileUploader from '../middlewares/caseFileUploader.js';
import { addCase, updateCase, removeCase } from '../controllers/caseController.js';
import JWT_verifier from '../middlewares/JWT_verifier.js';



const router = express.Router();


// ** For Admin
router.post("/", JWT_verifier("admin"), caseFileUploader, addCase);
router.post("/:caseId", JWT_verifier("admin"), caseFileUploader, updateCase);
router.delete("/:caseId", JWT_verifier("admin"), removeCase);



export default router;