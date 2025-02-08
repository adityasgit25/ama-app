import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

/*
    The important part here is that, if there is connection already then we use that else we create a new connection, because we don't want to create multiple connections to the database, it significantly decreases the performance of the application.

    In typescript, void means "no return value," a function returning void can still return undefined:
*/


async function dbConnect(): Promise<void>{
    // Check if we have a connection to the database or if it's currently connecting
    if (connection.isConnected){
        console.log('Already connected to the database');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to the database successfully');
    } catch (error) {
        console.log('Error connecting to the database: ', error);

        // Graceful exit in case of a connection error
        process.exit(1);
    }
}

export default dbConnect;