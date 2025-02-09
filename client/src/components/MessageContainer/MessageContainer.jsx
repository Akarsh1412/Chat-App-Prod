import React from "react";
import "./MessageContainer.css";
import Messages from "../Messages/Messages"; // Message component
import { useDispatch, useSelector } from "react-redux";
import SendInput from "./SendInput";
import { setSelectedUser } from "../../redux/userSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const MessageContainer = () => {
  const { selectedUser, onlineUsers, authUser} = useSelector(store=>store.user);
  const isOnline = onlineUsers?.includes(selectedUser?._id);
  const dispatch = useDispatch();

  return (
    <>
      {selectedUser ? (
        <div className="message-container">
          {/* Top Bar */}
          <div className="message-topbar">
            <ArrowLeftIcon
              className="back-icon"
              onClick={() => dispatch(setSelectedUser(null))}
            />
            <img
              src={selectedUser.profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <div className="user-info">
              <h3>{selectedUser.fullName}</h3>
              <p className="online">{`${isOnline ? "Online" : ""}`}</p>
            </div>
          </div>

          <Messages />

          {/* Bottom Input Bar */}
          <SendInput />
        </div>
      ) : (
        <h1 className="start-chat-message">Hey {authUser?.fullName}, <br />Let's Start Chatting</h1>
      )}
    </>
  );
};

export default MessageContainer;