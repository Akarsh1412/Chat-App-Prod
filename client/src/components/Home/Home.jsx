import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import MessageContainer from "../MessageContainer/MessageContainer";
import "./Home.css";

const Home = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="home-container">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
