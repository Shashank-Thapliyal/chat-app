const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");


const app = express();
const port = 5000 || process.env.PORT;


const users = [{}];


app.get("/", (req, res) => {
  res.send("nothing here");
})

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {

  socket.on('entered', ({
    userName
  }) => {
    users[socket.id] = userName;
    socket.emit("greet", {
      userName: "admin",
      message: `welcome to the chat, ${users[socket.id]}`,
    });
    socket.broadcast.emit("userEntered", {
      userName: "admin",
      "message": `${users[socket.id]} has joined`,
    })
  })

  socket.on('sendMessage', ({
    message
  }) => {
    io.emit('send', {
      user: users[socket.id],
      message: message,
      id: socket.id
    })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('leftchat', {
      userName: "admin",
      message: `${users[socket.id]} has left`,
    });
  })
});


server.listen(port);
