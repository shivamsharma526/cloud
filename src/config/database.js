import mongoose from "mongoose";

async function db() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABSE CONNECTED")
    } catch (error) {
        console.log("DATABSE ERROR" , error.message)
    }
}

export default db