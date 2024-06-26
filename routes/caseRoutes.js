// external import
import express from 'express';

// internal import
import caseFileUploader from '../middlewares/caseFileUploader.js';
import { addCase, getCases } from '../controllers/caseController.js';



const router = express.Router();


// ** For Admin
router.post("/", caseFileUploader, addCase);


// ** Both
router.get("/:caseContainerId", getCases);



export default router;