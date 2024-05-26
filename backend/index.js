const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Example room management (to be handled as per your application needs)
let rooms = {};

// Socket.io logic
io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("createRoom", () => {
    const roomCode = uuidv4();
    rooms[roomCode] = socket.id; // Store room association (example)
    socket.join(roomCode); // Join the room
    console.log("Room created:", roomCode);
    socket.emit("roomCreated", roomCode); // Notify client about room creation
  });
  socket.on("inputCode",(inputCode)=>{
    const room =io.sockets.adapter.rooms.get(inputCode);
    console.log({room});
    if(room && room.size<2){
      socket.join(inputCode);
      console.log(`user ${socket.id} has joined the room`);
      socket.emit("roomJoinedSuccessfully",room.size)
    }
  })

  socket.on("disconnect", () => {
    console.log("user is disconnected");
    // Clean up room associations if needed
    // Example: delete rooms[roomCode];
  });
});

// Serve static files (if necessary)
// app.use(express.static(path.join(__dirname, "./public")));

// Example route
// app.get("/", async (req, res) => {
//   const users = await prisma.user.findMany({});
//   return res.status(200).json({
//     data: users,
//   });
// });

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
