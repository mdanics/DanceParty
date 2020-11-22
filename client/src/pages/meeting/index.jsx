import React from "react";
import * as Cookies from "js-cookie";

import "./meeting.css";
import AgoraVideoCall from "../../components/AgoraVideoCall";
import { AGORA_APP_ID } from "../../agora.config";
import MemberList from "./messageList.js"

import io from 'socket.io-client'
const socket = io("https://2862e879752e.ngrok.io");

class Meeting extends React.Component {

  state = {
    members: [],
   score:0,

  }

    componentDidMount() {
        //Logic when someone joins
      socket.on('onJoin', (data) => {
          //ToDo -> Display special message, update score board

      })
      // Logic When someone leaves
      socket.on('onLeave', (data) => {
      //ToDo -> remove score from score board
    })

    // Logic to update a score for a particular user
    socket.on('updateLeaderboard', (data) => {
      //ToDo -> Given name of user, show special message to show someone got the points
      this.setState({members:data})
    
    })

    //Notify all connected members of my name and SocketId and score
    // const username = Cookies.get("username");
      if (Cookies.get("username") !== "host") {
          console.log("socketID", socket.id);
         
          socket.emit("newMember", socket.id, Cookies.get("username"));
      }
  }

  increaseScore = (value) => {
    //This funciton will be called after the result of the funciton is complete
    socket.emit("newScore", socket.id, Cookies.get("username"),  value);
   
  }


  constructor(props) {
    super(props);
  
    this.videoProfile = Cookies.get("videoProfile").split(",")[0] || "480p_4";
    this.channel = Cookies.get("channel") || "test";
    this.username = Cookies.get("username") || this.makeid(4);
    this.transcode = Cookies.get("transcode") || "interop";
    this.attendeeMode = Cookies.get("attendeeMode") || "video";
    this.baseMode = Cookies.get("baseMode") || "avc";
    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
  }



  render() {
    return (
      <div className="wrapper meeting">
        <div className="ag-header">
          <div className="ag-header-lead">
            <img
              className="header-logo"
              src={require("../../assets/images/ag-logo.png")}
              alt=""
            />
            <span onClick={() => {this.increaseScore(2)}}>FriendBop</span>
          </div>
          <div className="ag-header-msg">
            Room:&nbsp;<span id="room-name">{this.channel}</span>
          </div>
          
        </div>
        
        <div className="ag-main">
          <div id className="ui segment"> </div>
          <div className="ag-container">
            <AgoraVideoCall
              videoProfile={this.videoProfile}
              channel={this.channel}
              username={this.username}
              transcode={this.transcode}
              attendeeMode={this.attendeeMode}
              baseMode={this.baseMode}
              appId={this.appId}
              uid={this.username}
              increaseScore={this.increaseScore}
            />
          </div>
        </div>
        <MemberList msglist={this.state.members}/>
      </div>
    );
  }

   makeid = (length) => {
     var result           = '';


     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
}

export default Meeting;
