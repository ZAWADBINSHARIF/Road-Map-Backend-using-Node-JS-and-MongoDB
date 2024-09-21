// external import
import express from 'express';

// internal import
import caseFileUploader from '../middlewares/caseFileUploader.js';
import { addCase, updateCase, removeCase } from '../controllers/caseController.js';



const router = express.Router();


// ** For Admin
router.post("/", caseFileUploader, addCase);
router.post("/:caseId", caseFileUploader, updateCase);
router.delete("/:caseId", removeCase);



export default router;