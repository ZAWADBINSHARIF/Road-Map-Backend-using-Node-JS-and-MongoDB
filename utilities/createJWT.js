// external import 
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


// for getting the values of .env file
config();

const JWT_SECURE_TOKEN = process.env.JWT_SECURE_TOKEN;


export default async function createJWT(userInfo) {

    try {
        const token = await jwt.sign(userInfo, JWT_SECURE_TOKEN);
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}
