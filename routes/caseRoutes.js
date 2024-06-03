// external import
import express from 'express';

// internal import
import caseFileUploader from '../middlewares/caseFileUploader.js';
import { addCase } from '../controllers/caseController.js';



const router = express.Router();

router.get("/video", (req, res) => {
    res.send("<h1>Video upload section</h1>");
});
router.post("/video", caseFileUploader, addCase);


export default router;