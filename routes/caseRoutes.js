// external import
import express from 'express';
import multer from 'multer';

// internal import
import fileUploader from '../middlewares/fileUploader.js';



const router = express.Router();

router.get("/video", (req, res) => {
    res.send("<h1>Video upload section</h1>");
});
router.post("/video", fileUploader, (req, res) => {
    console.log(req.body);

    res.json({ message: 'File uploaded successfully' });
});


export default router;