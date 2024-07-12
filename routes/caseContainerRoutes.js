// external import
import express from 'express';


// internal import
import { createCaseContainer, removeCaseContainer } from '../controllers/caseContainerController.js';


const router = express.Router();

router.post("/", createCaseContainer);
router.delete("/:caseContainerId", removeCaseContainer);


export default router;