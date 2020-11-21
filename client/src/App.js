import React from 'react'; 
import io from 'socket.io-client'


const socket = io("http://localhost:8080"); 

class App extends React.Component {

      componentWillMount = () => {
        

        //Logic when someone joins
      socket.on('onJoin', (data) => {  
          //ToDo -> Display special message, update score board
      })

      // Logic When someone leaves
      socket.on('onLeave', (data) => {  
      //ToDo -> Remove Camera feed, remove score from score board
    })

    // Logic to update a score for a particular user
    socket.on('onScoreUpdate', (data) => {  
      //ToDo -> Given name of user, show special message to show someone got the points
      // 
    })
       


      }

render(){
        return (

            <div> 
              Hi

            </div>
        )

}
}
export default App; 