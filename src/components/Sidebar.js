import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Sidebar.css";
import { projectAuth, projectFirestore, timestamp } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { Link } from "react-router-dom";

const Sidebar = ({ setChatId, setChatName }) => {
  const { data: allChats } = useFirestore("messages");

  // console.log(allChats);

  const handelSignout = () => {
    const isSignout = window.confirm("Are you sure you want to signout?");
    if (isSignout) projectAuth.signOut();
  };

  const handelAddChat = () => {
    const chatName = prompt("Enter the group name...");
    // console.log(chatName);
    if (chatName.replace(/^[ ]+|[ ]+$/g, ""))
      projectFirestore.collection("messages").add({
        name: chatName,
        createdAt: timestamp(),
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={projectAuth.currentUser.photoURL || "/broken-image.jpeg"}
        />
        <div className="header__icon">
          <RateReviewIcon className="add__icon" onClick={handelAddChat} />
          <ExitToAppIcon className="signout__icon" onClick={handelSignout} />
        </div>
      </div>
      <Divider />
      <div className="sidebar__chat">
        {allChats &&
          allChats.map((chat) => (
            <main key={chat.id}>
              {window.innerWidth <= 600 ? (
                <main key={chat.id}>
                  <Link style={{ textDecoration: "none" }} to="/mobilechat">
                    <ListItem
                      key={chat.id}
                      className="chat__listItems"
                      onClick={() => {
                        setChatId(chat.id);
                        setChatName(chat.name);
                      }}
                    >
                      <Avatar
                        className="chat__icon"
                        src={"" || "/broken-image.jpeg"}
                      />
                      <ListItemText
                        primary={chat.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{
                                fontSize: "0.9rem",
                                color: "#d3d3d3",
                                fontWeight: 300,
                              }}
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                      <p style={{ fontSize: "10px", color: "gray" }}>
                        {chat.createdAt.toDate().toString().substr(0, 10)}
                      </p>
                    </ListItem>
                  </Link>
                </main>
              ) : (
                <main key={chat.id}>
                  <ListItem
                    className="chat__listItems"
                    onClick={() => {
                      setChatId(chat.id);
                      setChatName(chat.name);
                    }}
                  >
                    <Avatar
                      className="chat__icon"
                      src={"" || "/broken-image.jpeg"}
                    />
                    <ListItemText
                      primary={chat.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            style={{
                              fontSize: "0.9rem",
                              color: "#d3d3d3",
                              fontWeight: 300,
                            }}
                          ></Typography>
                        </React.Fragment>
                      }
                    />
                    <p style={{ fontSize: "10px", color: "gray" }}>
                      {chat.createdAt.toDate().toString().substr(0, 10)}
                    </p>
                  </ListItem>
                </main>
              )}
              <Divider />
            </main>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
