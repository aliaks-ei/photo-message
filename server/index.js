const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const fs = require("fs");

// Create HTTP server
const app = express();
const server = http.Server(app);

// Create web socket server
const io = socketio(server);

// Init server messages from disk
const messageData = fs.readFileSync(`${__dirname}/db/db.json`).toString();
const messages = messageData ? JSON.parse(messageData) : [];

// Listen for new socket client
io.on("connection", (socket) => {
  socket.emit("all_messages", messages);

  // Listen for new messages
  socket.on("new_message", (message) => {
    messages.unshift(message);

    // Persist to disk
    fs.writeFileSync(`${__dirname}/db/db.json`, JSON.stringify(messages));

    // Broadcast new message to all connected clients
    socket.broadcast.emit("new_message", message);
  });
});

// Server "app" directory
app.use(express.static(`${__dirname}/../app`));

// Server "node_modules" directory
app.use("/modules", express.static(`${__dirname}/../node_modules`));

// Start server
server.listen(8000, () =>
  console.log("Photo Message running on localhost:8000")
);
