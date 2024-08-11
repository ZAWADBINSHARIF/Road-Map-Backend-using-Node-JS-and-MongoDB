// external import
import * as nodemailer from "nodemailer";
import { config } from 'dotenv';

config();

export default async function sendOTP(RECEIVER_EMAIL, name, OTP) {

    const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    const SOFTWARE_NAME = process.env.SOFTWARE_NAME;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: {
                name: SOFTWARE_NAME,
                address: EMAIL_ADDRESS
            }, // sender address
            to: RECEIVER_EMAIL, // list of receivers
            subject: "OTP for your email verification", // Subject line
            // text: `The OTP code is ${OTP}`, // plain text body
            html: `<p><b>Dear ${name},</b> <br>Thank you for choosing Road Map! To complete your account setup, please use the following One-Time Password (OTP): <br><br><h1>Your OTP: ${OTP}</h1><br>Please enter this OTP within the next 10 minutes to verify your email address. If you did not request this OTP, please ignore this email. <br>If you have any questions or need assistance, feel free to reach out to our support team at support@roadmap.com. <br>Best regards, The Road Map Team</p> <br>`,
        });

    } catch (error) {
        console.log(error);
    }

}
