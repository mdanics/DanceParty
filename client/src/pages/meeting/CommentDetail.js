import React from 'react'; 
import './leaderboard.css';
const CommentDetail = (props) =>{

return(
  <div> 
    <div id="textbox">
    <p class="alignleft">{props.name}</p>
<p class="alignright">{props.score}</p>
  </div>
  </div>
);



}
export default CommentDetail; 