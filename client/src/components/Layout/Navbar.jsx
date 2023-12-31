import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import nyplogo from "../../assets/images/nyplogo.png";
import styles from "../../styles/Layout/Navbar.module.css";
import profile from "../../assets/images/profile.png";
import LogoutButton from "../Student/LogoutButton";

// const Navbar = () => {
//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <img src={nyplogo} alt='Logo' />
//                 </li>
//                 <li>
//                     <NavLink to="login">Login</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/">Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/itp">ITP</NavLink>
//                 </li>
//                 {/* <li>
//                     <NavLink to="/">Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/">Home</NavLink>
//                 </li> */}
//             </ul>
//         </nav>
//     )
// };

const Navbar = () => {
  let location = useLocation();

  const userRole = localStorage.getItem('userRole');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  if (location.pathname === '/') return null;
  return (
    <nav>
      


      {userRole === "regular" && (
        <>
          <ul>
            <div className={styles["images"]}>
            <li>
              <img src={nyplogo} alt='Logo' />
            </li>
            <li>
              <img className={styles["profile"]} src={profile} alt='profile'/>
            </li>
            </div>
          </ul>
          <ul>
            <li>
                <LogoutButton/>
            </li>
          </ul>
        </>
      )}

      
      {userRole === "admin" && (
        <>
          <ul>
            <div className={styles["images"]}>
            <li>
              <img src={nyplogo} alt='Logo' />
            </li>
            <li>
              <img className={styles["profile"]} src={profile} alt='profile'/>
            </li>
            </div>
          </ul>
          <div className={styles["menu-button"]} onClick={toggleMenu}>
            ☰ {/* Hamburger icon */}
          </div>
          <div className={`${styles["admin-menu-wrapper"]} ${isMenuOpen ? styles["open"] : ""}`}>
          <ul className={styles["admin-menu-bar"]}>
          <li>
              <Link to="/teacher/itp">ITP</Link>
            </li>
            <li>
              <Link to="itpsummary">ITP Summary</Link>
            </li> 
            <li>
              <Link to="prismsummary">Prism Summary</Link>
            </li> 
            <li>
              <Link to="teacherlanding">Teacher's Home Page</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
         
        </div>
        </>
      )}
     

      {!userRole && (
        <>
          <ul>
            <li>
              <img src={nyplogo} alt='Logo' />
            </li>
            {/* <li>
            <Link to="login">Login</Link>
        </li> */}
          </ul>
        </>
      )}

    </nav>
  );

};

export default Navbar;
