import singleFileUpload from "../utilities/singleFileUpload.js";

export default function caseFileUploader(req, res, next) {

    const upload = singleFileUpload({
        'uploadDestinationFolder': "cases",
        'acceptType': ["image/jpg", "image/png", "image/jpeg", "video/mp4", "video/webm", "video/mkv"],
        'errorMessage': "Only .jpg, .png, .jpeg, .mp4, .webm and .mkv allowed",
        'fileUri': "/cases"
    });


    upload.any()(req, res, err => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            next();
        }
    });
}