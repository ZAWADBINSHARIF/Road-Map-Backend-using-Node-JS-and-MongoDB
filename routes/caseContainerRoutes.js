// external import
import express from 'express';


// internal import
import { createCaseContainer, getAllCaseContainers, getCaseContainer, publishOrUnpublishCaseContainer, removeCaseContainer, updateCaseContainer } from '../controllers/caseContainerController.js';
import JWT_verifier from '../middlewares/JWT_verifier.js';


const router = express.Router();

// ** Admin
router.get("/publish_unpublish/:caseContainerId", JWT_verifier("admin"), publishOrUnpublishCaseContainer);
router.post("/", JWT_verifier("admin"), createCaseContainer);
router.post("/:caseContainerId", JWT_verifier("admin"), updateCaseContainer);
router.delete("/:caseContainerId", JWT_verifier("admin"), removeCaseContainer);

// ** Both
router.get("/:caseContainerId", getCaseContainer);
router.get("/", JWT_verifier(), getAllCaseContainers);



export default router;