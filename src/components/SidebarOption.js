import React from 'react';
import "./SidebarOption.css"; 
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SidebarOption({ Icon, title, id, addChannelOption }) {

  const navigate = useNavigate();
  const selectChannel = () => {
    if (id) {
      navigate(`/rooms/${id}`);
    } else {
      navigate(title);
    }
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      const roomsRef = collection (db, "rooms")
        addDoc(roomsRef, {
        name: channelName,
      });
    }
  };

  return <div 
         className="sidebarOption" onClick={addChannelOption ? addChannel:selectChannel}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span> {title}
        </h3>)
      }
  </div>;
}

 
