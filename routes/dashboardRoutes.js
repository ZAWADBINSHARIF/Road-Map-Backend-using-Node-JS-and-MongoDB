// external import
import express from "express";


// internal import
import JWT_verifier from "../middlewares/JWT_verifier.js";
import { getDashboardInfo } from "../controllers/dashboardController.js";



const router = express.Router();


router.get("/", JWT_verifier(), getDashboardInfo);


export default router;