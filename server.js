const express = require("express");
const http = require("http");


const port = process.env.PORT || 8080;
const app = express();
const root = require('path').join(__dirname, 'client/public')
app.use(express.static(root));
app.get("/", (req, res) => {
    res.sendFile('index.html', { root });
})
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

let members = new Map()
io.on("connection", (socket) => {
  console.log("New client connected");


  socket.on("disconnect", () => {
    //When the member leaves, we want to update all the users
    members.delete(socket.id)
    console.log("Client disconnected");
    var newList = [...members.values()]
    io.emit("updateLeaderboard",newList)
  });

  socket.on("newScore", (socketID, name, score ) => {

    if (members.has(socketID)) {
      var newScore =  members.get(socketID).Score + score
      var data = {Name:name, Score: newScore}
      members.set(socketID,data)
      var newList = [...members.values()]
      io.emit("updateLeaderboard",newList)
    } else {
      console.log("error trying to get: " + socketID);
    }



  })

  socket.on("newMember", (socketID, name, score ) => {
    // socketId: {name: name, score:score}
    var data = {Name:name, Score: score}
    members.set(socketID,data)
  
    //Once the dictionary is updated, emit to all connected memebrs 
    var newList = [...members.values()]
    io.emit("updateLeaderboard",newList)

  })

});
server.listen(port, () => console.log(`Listening on port ${port}`));