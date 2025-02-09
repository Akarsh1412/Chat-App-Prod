import React from "react";
import "./OtherUser.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid"; // Heroicons for default profile pic

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store=>store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`chat-other-user ${selectedUser?._id === user?._id ? "chat-selected" : ""}`}
    >
      <div className="chat-profile-picture">
        {user?.profilePic ? (
          <img src={user.profilePic} alt="user-dp" />
        ) : (
          <UserCircleIcon className="chat-default-icon" />
        )}
        <span className={`${isOnline ? `chat-status-dot` : `` }`}></span>
      </div>
      <div className="chat-user-info">
        <h4>{user?.fullName}</h4>
        <p className="chat-online-status">{`${isOnline ? "Online" : "" }`}</p>
      </div>
    </div>
  );
};

export default OtherUser;
