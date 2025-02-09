import React from "react";
import Message from "../Message/Message";
import "./Messages.css";
import useGetMessages from "../../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const {messages} = useSelector(store=>store.message);
  if (!messages) return;
  
  return (
    <div className="messages-container">
        {
          messages?.map((message) => {
            return (
              <Message key={message._id} message={message} />
            )
          })
        }
    </div>
  );
};

export default Messages;
