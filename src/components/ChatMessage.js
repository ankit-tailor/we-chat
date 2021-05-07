import React from "react";
import { Avatar } from "@material-ui/core";
import "./ChatMessage.css";
import { projectAuth } from "../firebase/config";

const ChatMessage = ({ uid, photoURL, text, createdAt }) => {
  const messageClass =
    projectAuth.currentUser.uid === uid ? "sent" : "recieved";
  return (
    <div className={`chat-message ${messageClass}`}>
      <Avatar className="avtar" src={photoURL || "/broken-image.jpeg"} />
      <p className="message">{text}</p>
    </div>
  );
};

export default ChatMessage;
