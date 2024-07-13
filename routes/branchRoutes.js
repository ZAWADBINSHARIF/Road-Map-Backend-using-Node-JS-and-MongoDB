// external import
import express from 'express';

// internal import
import { createNewBranch, getBranch, getBranchForUser } from '../controllers/branchController.js';


const router = express.Router();


// ** For Admin
router.post('/create_new_branch', createNewBranch);
router.get("/get_branch", getBranch);


// ** For user
router.get("/get_branch_for_user", getBranchForUser);


export default router;