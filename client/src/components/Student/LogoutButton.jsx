import React from "react";
import logout from "../../assets/images/logout.png";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/Layout/Navbar.module.css';
// import Login from "../../pages/Login";   

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      // Perform logout logic here
      console.log('User logged out');
      // You may want to redirect the user or perform other actions upon logout
      navigate("/")
      window.location.reload(false);
    }
  

  return (
    <button type="button" class="btn btn-outline-primary me-2" onClick={handleLogout}>Sign Out</button>
  );
};
export default LogoutButton;