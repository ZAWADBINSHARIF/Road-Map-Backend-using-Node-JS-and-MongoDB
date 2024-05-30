// external import
import express from 'express';
import multer from 'multer';



const router = express.Router();
const upload = multer({ 'dest': 'upload' });

router.get("/video", (req, res) => {
    res.send("<h1>Video upload section</h1>");
});
router.post("/video", upload.single('file'), (req, res) => {
    console.log(req.body);

    res.json({ message: 'File uploaded successfully' });
});


export default router;