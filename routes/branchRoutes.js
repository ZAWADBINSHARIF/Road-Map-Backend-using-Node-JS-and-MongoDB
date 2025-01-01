// external import
import express from 'express';

// internal import
import { createNewBranch, getBranch, getBranchForUser, removeBranch, updateBranch } from '../controllers/branchController.js';
import JWT_verifier from '../middlewares/JWT_verifier.js';


const router = express.Router();


// ** For Admin
router.post('/create_new_branch', JWT_verifier("admin"), createNewBranch);
router.get("/get_branch", getBranch);
router.put("/update_branch", JWT_verifier("admin"), updateBranch);
router.delete("/remove", JWT_verifier("admin"), removeBranch);


// ** For user
router.get("/get_branch_for_user", getBranchForUser);


export default router;