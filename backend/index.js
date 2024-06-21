const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
// const app = express();
const prisma = require("./database/prisma");
const { createServer } = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/user.route");

const app = require("./utils/oAuth");
const { updateUserSocket } = require("./utils/updateUserSocket");
const { userToGamePlayer } = require("./utils/userToGamePlayer");

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your frontend URL
    credentials: true,
  })
);

app.use("/api/v1/users",userRoutes)
const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Example room management (to be handled as per your application needs)
let rooms = {};
console.log({ rooms });
var roomData;
// Socket.io logic
io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("createRoom", async (googleId) => {
    console.log({ googleId });
    await updateUserSocket(googleId, socket.id);
    const roomCode = uuidv4();
    rooms[roomCode] = socket.id; // Store room association (example)
    socket.join(roomCode); // Join the room
    // now update user with game player
    await userToGamePlayer(googleId, roomCode);

    console.log("Room created:", roomCode);
    socket.emit("roomCreated", roomCode); // Notify client about room creation
  });
  socket.on("inputCode", async (inputCode, googleId) => {
    const room = io.sockets.adapter.rooms.get(inputCode);
    console.log({ room });
    if (room && room.size < 2) {
      socket.join(inputCode);
      rooms[inputCode] = socket.id;
      console.log(`user ${socket.id} has joined the room`);
      // update user socket
      await updateUserSocket(googleId, socket.id);
      // update user game player

      await userToGamePlayer(googleId, inputCode);
      socket.emit("roomJoinedSuccessfully", room.size,inputCode);
      roomData = room;
      console.log({ room });
      io.to(room.id).emit("roomx", room.size);
    }
  });
  socket.on("isPopup", () => {
    // console.log(roomData.size);
    let size = roomData?.size ?? 0;
    socket.emit("popupOff", size);
    console.log({ size });
  });

  // user move
  socket.on("userMove", ({ index, variable }) => {
    // now broadcast the move
    socket.broadcast.emit("updateMove", { index, variable });
  });

  // local game
  socket.on("lockGame", () => {
    socket.broadcast.emit("gameLock");
  });

  // first user login data
  socket.on("firstUserData", (users) => {
    console.log(`from server first user data is ${users.name}`);
    socket.broadcast.emit("userDataServer", users);
  });


  socket.on("playerTurn",()=>{
    socket.broadcast.emit("playerTurnSucc")
  })

  socket.on("disconnect", () => {
    console.log("user is disconnected");
    // Clean up room associations if needed
    // Example: delete rooms[roomCode];
  });
});

// Serve static files (if necessary)
// app.use(express.static(path.join(__dirname, "./public")));

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // If your frontend and backend share cookies/session information
  })
);

// get current user
app.get("/currentUser", async (req, res) => {
  // console.log({sessionStorage:req.sessionStore});
  // console.log({sessionStorage:req.session});
  console.log({ userData: req.user });
  // fetch user based on google id
  if (req?.user?.id) {
    let user = req.user;
    res.json({
      user,
    });
  } else {
    res.json({});
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    req.session.destroy(); // Destroy the session
    res.clearCookie("connect.sid"); // Clear session cookie if using express-session
    res.status(200).json("ok");
  });
});


app.get("/gamePlayer",(req,res)=>{
  // need to get the game player of the users
  
})

module.exports = app;
