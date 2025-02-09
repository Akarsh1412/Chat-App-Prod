import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { app, io, server } from "./socket/socket.js"
import path from "path"

dotenv.config();

const PORT = process.env.PORT;

const _dirname = path.resolve();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
}

app.use(cors(corsOption));

//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(_dirname, "/client/build")));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server Live at port ${PORT}`);
});
