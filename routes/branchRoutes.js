// external import
import express from 'express';

// internal import
import { createNewBranch, getBranch } from '../controllers/branchController.js';


const router = express.Router();

router.post('/create_new_branch', createNewBranch);
router.get("/get_branch", getBranch);


export default router;