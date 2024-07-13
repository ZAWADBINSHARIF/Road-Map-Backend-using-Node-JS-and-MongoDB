// external import
import express from 'express';


// internal import
import { createCaseContainer, removeCaseContainer, updateCaseContainer } from '../controllers/caseContainerController.js';


const router = express.Router();

router.post("/", createCaseContainer);
router.post("/:caseContainerId", updateCaseContainer);
router.delete("/:caseContainerId", removeCaseContainer);


export default router;