// external import
import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';


// internal import
import dbConnection from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import caseRouters from './routes/caseRoutes.js';
import caseContainerRoutes from './routes/caseContainerRoutes.js';
import userRouters from './routes/userRoutes.js';
import answerCaseRouters from "./routes/answerCaseRoutes.js";


// for getting the values of .env file
config();

const app = express();
const __dirname = import.meta.dirname;
const PORT = process.env.PORT;

// database connection
dbConnection();

// allow cors cross orgin
app.use(cors({
    'origin': '*'
}));

// for getting cookies
app.use(cookieParser());

// for getting json data
app.use(express.json());

// for getting form data values
app.use(express.urlencoded({ extended: true }));


app.use('/api', express.static(path.join(__dirname, 'public', 'upload')));

// all routers path
app.use("/api", authRoutes);
app.use("/api/user", userRouters);
app.use("/api/branch", branchRoutes);
app.use("/api/case", caseRouters);
app.use("/api/caseContainer", caseContainerRoutes);
app.use("/api/answerCase", answerCaseRouters);

mongoose.connection.once('open', () => {
    console.log("Database is connected");
    app.listen(PORT, () => console.log(`server is listening on port: http://127.0.0.1:${PORT}`));
});