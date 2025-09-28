import express, { type Request, type Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Welcome to lawrence");
})


export default app;