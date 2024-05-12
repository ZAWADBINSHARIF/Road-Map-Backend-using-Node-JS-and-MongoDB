// external import
import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


// internal import
import dbConnection from './config/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import branchRoutes from './routes/branchRoutes.js';


// for getting the values of .env file
config();

const app = express();
const PORT = process.env.PORT;

// database connection
dbConnection();

// allow cors cross orgin
// app.use(cors(corsOptions));

// for getting cookies
app.use(cookieParser());

// for getting json data
app.use(express.json());

// for getting form data values
app.use(express.urlencoded({ extended: true }));


// all routers path
app.get('/', (req, res) => {
    res.send("<h1>Server is running 🚀</h1>");
});

app.use("/api", authRoutes);
app.use("/api/branch", branchRoutes);

mongoose.connection.once('open', () => {
    console.log("Database is connected");
    app.listen(PORT, () => console.log(`server is listening on port: http://127.0.0.1:${PORT}`));
});