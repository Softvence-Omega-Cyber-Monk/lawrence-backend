import { Server } from "http";
import mongoose from "mongoose";
import { enVars } from "./app/config/env";
import app from "./app"


let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(enVars.DB_URL);
        console.log("Connected to DB");


        server = app.listen(5000, () => {
            console.log("Server is listening to port 5000");
        })
    }
    catch (err) {
        console.log(err)
    }
}
startServer();