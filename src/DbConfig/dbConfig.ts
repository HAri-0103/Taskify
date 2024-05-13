import mongoose from "mongoose";

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        });
        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB', err)
        });
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}