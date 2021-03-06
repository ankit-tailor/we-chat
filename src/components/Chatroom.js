import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
// import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import "./Chatroom.css";
import ChatMessage from "./ChatMessage";
import { projectAuth, projectFirestore, timestamp } from "../firebase/config";
import useLoadChat from "../hooks/useLoadChat";

const Chatroom = ({ chatId, chatName, setChatId }) => {
  const [sendMessage, setSendMessage] = useState("");
  const { data: allMessages } = useLoadChat("messages", chatId);
  // console.log(allMessages);
  const dummy = useRef();
  const sendButtonStyle = {
    color: !sendMessage && "gray",
    cursor: !sendMessage && "not-allowed",
  };

  const { uid, photoURL } = projectAuth.currentUser;

  useEffect(() => {
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  }, [allMessages]);

  const handelSendMessage = (e) => {
    e.preventDefault();
    if (sendMessage) {
      projectFirestore
        .collection("messages")
        .doc(chatId)
        .collection("messages")
        .add({
          text: sendMessage,
          createdAt: timestamp(),
          uid,
          photoURL,
        });
      setSendMessage("");
      dummy.current.scrollIntoView({ behaviour: "smooth" });
    }
  };

  const handelDeleteChat = () => {
    if (window.confirm(`Are you sure you want to delete ${chatName}`)) {
      projectFirestore.collection("messages").doc(chatId).delete();
      setChatId(null);
    }
  };

  return (
    <div className="chatroom">
      <div className="chatroom__header">
        <div className="chatroom__info">
          <Avatar src={"" || "/broken-image.jpeg"} />
          <p>{chatName}</p>
        </div>
        <DeleteIcon style={{ cursor: "pointer" }} onClick={handelDeleteChat} />
      </div>
      <div className="chatroom__messages">
        {allMessages &&
          allMessages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              uid={message.uid}
              photoURL={message.photoURL}
              createdAt={message.createdAt}
            />
          ))}
        <span ref={dummy}></span>
      </div>
      <div className="message__input">
        <form onSubmit={handelSendMessage}>
          <input
            required
            value={sendMessage}
            type="text"
            placeholder="Type a message"
            onChange={(e) => {
              let value = e.target.value;
              if (value[0] === " ") {
                value = value.replace(/^[ ]+|[ ]+$/g, "");
              }
              setSendMessage(value);
            }}
          />
          <SendOutlinedIcon
            onClick={handelSendMessage}
            style={sendButtonStyle}
            className="send__icon"
          />
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
