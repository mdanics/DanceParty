import React from 'react'; 
import CommentDetail from './CommentDetail';
import './leaderboard.css';
const MessageList = (props) => {
    if(props.msglist.length != 0){
    console.log(props)
  const images = props.msglist.map(msg => {
    return <div className="ui segment "><CommentDetail name = {msg.Name} score={msg.Score}/></div> 
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