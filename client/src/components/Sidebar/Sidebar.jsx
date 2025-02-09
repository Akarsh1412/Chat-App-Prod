import React, { useEffect, useState } from "react";
import { FaSearch, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import OtherUsers from "../OtherUsers/OtherUsers"; 
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSelectedUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";

const Sidebar = () => {
  useGetOtherUsers();
  const { authUser, otherUsers } = useSelector(store => store.user);
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState(otherUsers);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()  => {
    if (search !== "")
      setSearchUsers(otherUsers.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase())));

    return () => setSearchUsers(otherUsers);
  }, [search, otherUsers]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/v1/user/logout");
      dispatch(setAuthUser(null));
      dispatch(setSelectedUser(null));
      toast.success("Logout Successful!");
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Menu Button for Mobile */}
      <button className="chat-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`chat-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="chat-sidebar-search">
          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="chat-search-input"
          />
          <button type="submit" className="chat-search-btn">
            <FaSearch />
          </button>
        </form>

        {/* User List */}
        <div className="chat-sidebar-users">
          <OtherUsers otherUsers = {searchUsers} />
        </div>

        {/* Logged-in User Info */}
        <div className="chat-loggedin-user">
          <img src={authUser?.profilePic} alt="loggin-user-profilepic" className="chat-user-icon" />
          <span className="chat-user-name">{authUser?.fullName}</span>
        </div>

        {/* Logout Button */}
        <button className="chat-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="chat-logout-icon" /> Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;