const { createServer } = require("http");
const { Condiment } = require("next/font/google");

const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  socket.on("chat-comment", msg => {
    io.emit("chat-comment", msg)
  });

  socket.on("chat-reply", msg => {
    io.emit("chat-reply", msg)
  });

  socket.on("likes", msg => {
    io.emit("likes", msg)
  });

  socket.on("deletes", msg => {
    io.emit("deletes", msg)
  });

})


httpServer.listen(5000, () => console.log("Server is connected"))