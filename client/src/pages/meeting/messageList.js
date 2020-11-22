import React from 'react'; 
import CommentDetail from './CommentDetail';
import './leaderboard.css';
const MessageList = (props) => {
    if(props.msglist.length != 0){
    console.log(props)


  const images = props.msglist.map(msg => {
    console.log(document.querySelector("#ag-item-"+msg.name));
    if(document.querySelector("#ag-item-"+msg.name)!=null){
        var el = document.createElement("span");
        el.innerHTML = `${msg.totalScore}`
        el.style.position = 'absolute'
        el.style.color="white"
        el.style.fontSize="50px"
        el.style.top="5px"
        el.style.right="10px"
        el.style.zIndex="99"
        el.style.backgroundColor="black";
        el.style.borderRadius="10px";
        el.style.paddingLeft="8px";
        el.style.paddingRight="8px";
        console.log("i am an andix");
        document.querySelector("#player_"+msg.name).appendChild(el)
    }

    // return <div className="ui segment "><CommentDetail name = {msg.name} score={msg.totalScore}/></div>
    return <div></div>
  });

    if(document.querySelector("#ag-item-host")!=null){
        var el = document.createElement("span");
        el.innerHTML = 'Host'
        el.style.position = 'absolute'
        el.style.color="white"
        el.style.fontSize="50px"
        el.style.top="5px"
        el.style.right="10px"
        el.style.zIndex="99"
        el.style.backgroundColor="#00000094";
        el.style.borderRadius="10px";
        el.style.paddingLeft="8px";
        el.style.paddingRight="8px";

        document.querySelector("#player_host").appendChild(el)
    }

  return(

  // <div id="leaderBoard" className="ui segment">
  // <center> <h1 id="leaderBoardText"> LeaderBoard </h1></center>
  // {images}
  <div>
  </div>
  );
    }else{

        return(<div></div>)
    }
};

export default MessageList;