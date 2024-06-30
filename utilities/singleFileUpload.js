// external import
import multer from "multer";
import path from 'path';

export default function singleFileUpload(
    {
        uploadDestinationFolder,
        acceptType,
        fileUri,
        errorMessage,
    }
) {

    const __dirname = import.meta.dirname;
    const uploadFolder = path.join(`${__dirname}`, "..", "public", "upload", `${uploadDestinationFolder}`);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolder);
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);

            const fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" +
                Date.now();
            const fullFileName = fileName + fileExt;
            const fileInfoObj = {
                uri: `${fileUri}/${fullFileName}`,
                type: file.mimetype,
                name: fileName
            };

            if (req.body.mediaFiles) {
                req.body.mediaFiles.push(fileInfoObj);
            } else {
                req.body.mediaFiles = [];
                req.body.mediaFiles.push(fileInfoObj);
            }

            cb(null, fullFileName);
        }
    });


    const upload = multer({
        storage,
        fileFilter: (req, file, cb) => {
            if (acceptType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        }
    });

    return upload;

}