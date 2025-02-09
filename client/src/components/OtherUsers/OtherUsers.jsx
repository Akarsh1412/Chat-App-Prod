import React from "react";
// import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import "./OtherUsers.css";
import OtherUser from "../OtherUser/OtherUser";
// import { useSelector } from "react-redux";

function OtherUsers({otherUsers}) {
  // Empty State
  if (!otherUsers || otherUsers.length === 0) {
    return <p className="chat-other-users-empty">No users available.</p>;
  }

  return (
    <div className="chat-other-users">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
}

export default OtherUsers;
