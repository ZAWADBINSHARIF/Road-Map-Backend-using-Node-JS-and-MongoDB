// external import
import express from 'express';


// internal import
import { createCaseContainer, getCaseContainer, publishOrUnpublishCaseContainer, removeCaseContainer, updateCaseContainer } from '../controllers/caseContainerController.js';


const router = express.Router();

// ** Admin
router.get("/publish_unpublish/:caseContainerId", publishOrUnpublishCaseContainer);
router.post("/", createCaseContainer);
router.post("/:caseContainerId", updateCaseContainer);
router.delete("/:caseContainerId", removeCaseContainer);

// ** Both
router.get("/:caseContainerId", getCaseContainer);



export default router;