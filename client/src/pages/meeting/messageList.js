import React from 'react'; 
import CommentDetail from './CommentDetail';
import './leaderboard.css';
const MessageList = (props) => {
    if(props.msglist.length != 0){
    console.log(props)

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  const images = props.msglist.map(msg => {
    console.log(document.querySelector("#ag-item-"+msg.name));
    if(document.querySelector("#ag-item-"+msg.name)!=null){
        var el = document.createElement("span");
        el.innerHTML = `${msg.totalScore}` 
        el.style.position = 'fixed'
        el.style.color="white"
        el.style.fontSize="50px"
        el.style.top="0"
        el.style.right="0"
        insertAfter(el ,document.querySelector("#ag-item-"+msg.name))
    }
    
    return <div className="ui segment "><CommentDetail name = {msg.name} score={msg.totalScore}/></div>
  });

  return( 
  
  <div id="leaderBoard" className="ui segment">
  <center> <h1 id="leaderBoardText"> LeaderBoard </h1></center>
  {images}
  
  </div>
  );
    }else{

        return(<div></div>)
    }
};

export default MessageList;