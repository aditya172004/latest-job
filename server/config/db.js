import mongoose from "mongoose";

// Function to connect to the MongoDB DB
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database connected'));

    await mongoose.connect(`${process.env.MONGO_URl}/job-portal`);
}


export default connectDB;