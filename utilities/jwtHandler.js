// external import 
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


// for getting the values of .env file
config();

const JWT_SECURE_TOKEN = process.env.JWT_SECURE_TOKEN;


export async function createJWT(userInfo) {

    try {
        const token = await jwt.sign(userInfo, JWT_SECURE_TOKEN);
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function verifyJWT(req, res, next) {
    let cookie = req.headers.authorization;

    cookie = cookie.split(" ")[1];

    try {
        const decode = await jwt.verify(cookie, JWT_SECURE_TOKEN);
        return res.status(200).json({ userInfo: decode });
    } catch (error) {
        console.log(error);
        return res.status(401).json(error);
    }

}