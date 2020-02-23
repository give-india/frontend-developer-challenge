const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.Server(app);
server.listen((PORT = 8031), () => {
  console.log(`your app is running on port:${PORT}`);
});

const io = socketIo(server);

io.on("connection", socket => {
  socket.on("playlist", msg => {
    io.emit("playlist", msg);
  });
  socket.on("live_video", data => {
    io.emit("live_video", data);
  });
});
