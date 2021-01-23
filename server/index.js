import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import * as socketIO from "socket.io";
import dotenv from "dotenv";
import router from "./router.js";
import { addUser, removeUser, getUser, getUsersInRooms } from "./users/user.js";

const app = express();

app.use(morgan("tiny"));
app.use(
    cors({
        allowedHeaders: ["sessionId", "Content-Type"],
        exposedHeaders: ["sessionId"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
);
dotenv.config();

const server = http.createServer(app);
const io = new socketIO.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
});

io.on("connection", (socket) => {
    console.log("we have a new connection!!");

    socket.on("join", ({ name, room }) => {
        console.log(name, room);
    });

    socket.on("disconnect", () => {
        console.log("User has left!!");
    });
});

app.use("/", router);

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`server is running in this ${port}!!`));