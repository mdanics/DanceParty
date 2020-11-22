import io from 'socket.io-client'
import * as Cookies from "js-cookie";

const socket = io("http://localhost:8080");

const increaseScore = (value) => {
    //This funciton will be called after the result of the funciton is complete
    socket.emit("newScore", socket.id, Cookies.get("username"),  value);
  }



export { socket, increaseScore };