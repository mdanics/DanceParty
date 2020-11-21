const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;
const app = express();
const root = require('path').join(__dirname, 'client/public')
app.use(express.static(root));
app.get("/", (req, res) => {
    res.sendFile('index.html', { root });
})
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("New client connected");


  socket.on("disconnect", () => {
    console.log("Client disconnected");

  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));