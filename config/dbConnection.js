import mongoose from "mongoose";

export default async function dbConnection() {
    try {
        const databaseName = process.env.DATABASE_NAME;
        const databaseURI = process.env.DATABASE_URI;
        await mongoose.connect(`${databaseURI}/${databaseName}`);
    } catch (error) {
        console.log(error);
    }
}