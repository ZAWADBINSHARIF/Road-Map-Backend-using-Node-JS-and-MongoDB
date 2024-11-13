// external import
import multer from "multer";

// internal import
import singleFileUpload from "../utilities/singleFileUpload.js";

export default function clientProfileImageUploader(req, res, next) {

    const upload = singleFileUpload({
        'uploadDestinationFolder': "clients",
        'acceptType': ["image/jpg", "image/png", "image/jpeg"],
        'errorMessage': "Only .jpg, .png and .jpeg allowed",
        'fileUri': "/clients"
    });


    upload.single("profileImageFile")(req, res, err => {
        if (err instanceof multer.MulterError) {
            console.log(err);
            res.status(500).json({
                error: err.message
            });
        } else if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            next();
        }
    });
}