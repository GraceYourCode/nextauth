const { createServer } = require("http");

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
})



httpServer.listen(5000, () => console.log("Server is connected"))