const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
    console.log("Overlay connected");
});

function dropBall(username, column) {
    io.emit("drop", { username, column });
}

app.get("/test", (req, res) => {
    dropBall("TestUser", Math.floor(Math.random() * 8));
    res.send("Ball dropped");
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});