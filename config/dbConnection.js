import mongoose from "mongoose";

export default async function dbConnection() {
    try {
        const databaseName = process.env.DATABASE_NAME;
        await mongoose.connect(`mongodb://localhost:27017/${databaseName}`);
    } catch (error) {
        console.log(error);
    }
}