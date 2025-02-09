import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/messageSlice";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function SendInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        { withCredentials: true }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="message-input" onSubmit={handleClick}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
      />
      <button type="submit" className="send-btn">
        <PaperAirplaneIcon className="send-icon" />
      </button>
    </form>
  );
}

export default SendInput;