import { useEffect, useRef } from "react";
import "./Message.css";
import { useSelector } from "react-redux";

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser} = useSelector(store=>store.user);

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'});
  }, [message])
  return (
    <div ref = {scroll} className={`message ${authUser?._id === message?.senderId ? `sender` : `receiver`}`}>
      <p>{message?.message}</p>
    </div>
  );
};

export default Message;
