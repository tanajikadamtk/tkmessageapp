/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,

}
const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected to DataBase");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MOMGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState
        console.log("DB connected Succesfully");
        
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(error){
        console.log("DB connection failed"  ,error);
        process.exit(1)

    }
}
export default dbConnect;