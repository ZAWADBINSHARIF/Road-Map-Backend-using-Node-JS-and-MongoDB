// external import
import express from 'express';


// internal import
import { createCaseContainer } from '../controllers/caseContainerController.js';


const router = express.Router();

router.post("/", createCaseContainer);


export default router;