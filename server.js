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
  },
  pingTimeout: 15000
});

class Member {
  constructor(socketID, name) {
    this.socketID = socketID;
    this.name = name;
    this.currentScore = 0;
    this.totalScore = 0;
  }
}



let members = new Map()

io.on("connection", (socket) => {
  console.log("New client connected");


  socket.on("disconnect", (reason) => {
    //When the member leaves, we want to update all the users

    members.forEach(member => {
      if (member.socketID === socket.id) {
        delete members[member.name]
      }
    })

    console.log("Client disconnected for:", reason);
    var newList = [...members.values()]
    io.emit("updateLeaderboard",newList)
  });

  socket.on("newScore", (socketID, name, score ) => {
    if (members.has(name)) {
      members.get(name).currentScore += score;

    } else {
      console.log("error trying to get: " + name);
    }
  })

  // called every 5 seconds
  const updateScoreboard = () => {

    const sortedListOfMembers = [...members.values()].sort((a, b) => b.currentScore - a.currentScore);

    sortedListOfMembers[0].totalScore += 100;
    // sortedListOfMembers[1].totalScore += 50;
    // sortedListOfMembers[2].totalScore += 25;


    // reset members to 0
    for (let member of sortedListOfMembers) {
      member.currentScore = 0;
    }

    refreshLeaderboard();
  }


  socket.on('start', () => {

    setInterval(updateScoreboard,5000);
    socket.emit('gameStarted');
  })

  socket.on("newMember", (socketID, name) => {
    // socketId: {name: name, score:score}
    members.set(name, new Member(socketID, name))
  
    //Once the dictionary is updated, emit to all connected memebrs 
    refreshLeaderboard();

  })


  const refreshLeaderboard = () => {
    var newList = [...members.values()]
    io.emit("updateLeaderboard",newList)
  }

});
server.listen(port, () => console.log(`Listening on port ${port}`));


