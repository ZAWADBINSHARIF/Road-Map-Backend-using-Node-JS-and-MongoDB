// external import
import express from 'express';

// internal import
import { createNewBranch, getBranch, getBranchForUser, removeBranch, updateBranch } from '../controllers/branchController.js';


const router = express.Router();


// ** For Admin
router.post('/create_new_branch', createNewBranch);
router.get("/get_branch", getBranch);
router.post("/update_branch", updateBranch);
router.delete("/remove", removeBranch);


// ** For user
router.get("/get_branch_for_user", getBranchForUser);


export default router;