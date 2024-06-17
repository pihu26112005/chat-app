import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './Routes/userRoute.js';
import  { notFound, errorHandler } from './Middlewares/errorMiddleware.js';
import dotenv from 'dotenv';
import chatRouter from './Routes/chatRoute.js';
import messageRouter from './Routes/messageRoute.js';
import { Server } from 'socket.io';
import path from "path";

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(cors());// cross - origin resource sharing 

connectDB();

app.use('/api/user',userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  // Adjust the path to the build directory of your React app
  app.use(express.static(path.join(__dirname1, "../FRONTEND/dist")));

  app.get("*", (req, res) =>
    // Adjust the path to the index.html file of your React app
    res.sendFile(path.resolve(__dirname1, "../FRONTEND/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
      // credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
