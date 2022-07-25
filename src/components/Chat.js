import "./Chat.css";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  StarBorderOutlined as StarBorderOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
import db from '../firebase';
import { doc, onSnapshot, collection, orderBy, query } from "firebase/firestore";
import Message from '../components/Message';
import ChatInput from '../components/ChatInput'

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);


  const roomRef = doc(db, "rooms", roomId);
  const messagesRef = collection(db, "rooms",roomId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));

  useEffect(() => {
      
    if (roomId) {
      onSnapshot(roomRef, (doc) => {
        setRoomDetails(doc.data());
      });

      onSnapshot(q,(snapshot) => setRoomMessages(snapshot.docs.map(doc => doc.data()))
      )
        }
        }, [roomId]);
    
  useEffect(() => {
    var messageBody = document.querySelector("#divChatContainer");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  });

    return (
     <div className="chat" id="divChatContainer">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
        </div>
       
             <div className="chat__messages">
        {roomMessages?.map(({ message, user, timestamp, userImage }) => (
          <Message
            message={message}
            user={user}
            userImage={userImage}
            timestamp={timestamp}
          />
        ))}
        </div>
        <ChatInput channelName={roomDetails?.name} channelId={roomId} />
            </div>

    ) 
    
}
export default Chat;