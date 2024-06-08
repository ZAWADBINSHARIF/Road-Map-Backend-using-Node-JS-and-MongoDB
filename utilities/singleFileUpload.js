// external import
import multer from "multer";
import path from 'path';

export default function singleFileUpload(
    {
        uploadDestinationFolder,
        acceptType,
        errorMessage
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

            if (req.body.case_files_name) {
                req.body.case_files_name.push(fileName + fileExt);
            } else {
                req.body.case_files_name = [];
                req.body.case_files_name.push(fileName + fileExt);
            }

            console.log(fileName + fileExt);

            cb(null, fileName + fileExt);
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