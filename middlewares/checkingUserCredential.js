// external import
import jwt from "jsonwebtoken";
import { config } from 'dotenv';


// internal import
import User from "../models/User.js";




config();

const JWT_SECURE_TOKEN = process.env.JWT_SECURE_TOKEN;


export default async function checkingUserCredential(req, res, next) {
    console.log(req.originalUrl);

    let cookie = req.headers.authorization;

    if (cookie) {
        try {
            cookie = cookie?.split(" ")[1];

            const decode = await jwt.verify(cookie, JWT_SECURE_TOKEN);
            const user_id = decode._id;

            const foundUser = await User.findById({ _id: user_id });

            if (!foundUser) {
                return res.status(404).json({
                    errorName: "User Credential Error",
                    errorMessage: "User is not found",
                    logout: true
                });
            }

            if (foundUser.accountStatus === "deactive") {
                return res.status(403).json({
                    errorName: "User Credential Error",
                    errorMessage: "Your account is deactive",
                    logout: true
                });
            }

            if (foundUser.rule !== decode.rule) {
                return res.status(405).json({
                    errorName: "User Credential Error",
                    errorMessage: "Your account role has been changed by Admin",
                    logout: true
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }


    next();
}