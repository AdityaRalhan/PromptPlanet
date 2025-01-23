import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDb = async() => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDb is already connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "sharePrompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('Fresh MongoDb connection established');
    } catch (error) {
        console.log("error in connecting MongoDb", error);
    }
}