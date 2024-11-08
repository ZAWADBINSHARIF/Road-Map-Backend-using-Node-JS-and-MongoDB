// external import
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


// for getting the values of .env file
config();

const JWT_SECURE_TOKEN = process.env.JWT_SECURE_TOKEN;

export default function JWT_verifier(role = null) {
    return async (req, res, next) => {
        let cookie = req.headers.authorization;


        try {
            cookie = cookie.split(" ")[1];

            const decode = await jwt.verify(cookie, JWT_SECURE_TOKEN);
            req._id = decode._id;

            if (role) {

                if (decode.rule.toLowerCase() === role.toLowerCase()) {
                    next();
                } else {
                    return res.status(401).json({ error: "User is unauthorized" });
                }

            } else {
                next();
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }

    };
}