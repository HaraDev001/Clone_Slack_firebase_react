import React, { useState } from "react";
import "./ChatInput.css";
import db from '../firebase';
import {collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import { Button } from "@mui/material";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
    const [{user}] = useStateValue();
    
     const messagesRef = collection(db, "rooms",channelId, 'messages');

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {  
        addDoc(messagesRef, {
             message: input,
            user: user.displayName,
             userImage: user.photoURL,
            timestamp: serverTimestamp(),
        });
      setInput("");
    }
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <Button type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;