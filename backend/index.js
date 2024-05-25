const express = require("express");
const path = require("path");
const Router = require("./routes");
const prisma = require("./database/prisma");
require("./database/prisma");
const app = require("./utils/oAuth");
const { v4: uuidv4 } = require("uuid");

const { createServer } = require("node:http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server);

// when a user is connected
io.on("connection", (socket) => {
  console.log("a user is connected");

  // create user room
  socket.on("createRoom", () => {
    const roomCode = uuidv4();
    rooms[roomCode] = socket.id;
    socket.join(roomCode);
    socket.emit("roomCreated", roomCode);
  });

  socket.on("disconnect", () => {
    console.log("user is disconeected");
  });
});

const cors = require("cors");
app.use(cors());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.status(200).json({
    data: users,
  });
});

// connect backend with public file
app.use(express.static(path.join(__dirname, "./public")));

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

module.exports = app;
