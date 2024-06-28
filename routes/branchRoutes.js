// external import
import express from 'express';

// internal import
import { createNewBranch, getBranch } from '../controllers/branchController.js';


const router = express.Router();


// ** For Admin
router.post('/create_new_branch', createNewBranch);
router.get("/get_branch", getBranch);


// ** For user



export default router;