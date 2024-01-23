import { connection, connect, disconnect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export class MongoConnection {
    static initialize() {
    try {
        connection.on('error', (error: any) => {console.log(`connection failed, error ${error}`)})
        connection.on('open', () => {console.log(`Successful connection`)})
        connection.on('close', () => {console.log(`Disconnect from Mongodb`)})
        connect(process.env.MONGO_URL as string);
    } catch(e) {
        console.log(`Failed to connect. Error: ${e}`);
    }   
}
    static finish() {
        connection.close();
}
}
