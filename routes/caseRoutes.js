// external import
import express from 'express';

// internal import
import caseFileUploader from '../middlewares/caseFileUploader.js';
import { addCase } from '../controllers/caseController.js';



const router = express.Router();


router.post("/", caseFileUploader, addCase);


export default router;