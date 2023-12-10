import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UI/Login.module.css";
// import Home from "../pages/Home.jsx";




const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    localStorage.setItem('userRole', '');

    const useButton = async () => {
        setEmailError("");
        setPasswordError("");
      
        if ("" === email) {
          setEmailError("Please enter your email");
          return;
        }
      
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError("Please enter a valid email");
          return;
        }
      
        if ("" === password) {
          setPasswordError("Please enter a password");
          return;
        }
      
        if (password.length < 7) {
          setPasswordError("The password must be 8 characters or longer");
          return;
        }
      
        try {
          // Make a POST request to the backend API for authentication
          const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
      
          if (response.ok) {
            const data = await response.json();
      
            // Set the user's role in local storage
            localStorage.setItem("userRole", data.role);
      
            // Redirect based on user role
            if (data.role === 0) {
              navigate("studentform");
            } else if (data.role === 1) {
              navigate("teacherlanding");
            } else {
              // Handle other roles or unexpected values
              console.error("Invalid user role");
            }
          } else {
            // Handle authentication error
            const errorData = await response.json();
            setEmailError(errorData.error || "Authentication failed");
          }
        } catch (error) {
          console.error(error);
          setEmailError("An error occurred during authentication");
        }
      };
      

    return (
        <div className={styles["maincontainer"]}>
            <br />
            <div className={styles["inputContainer"]}>
                <div className={styles['inputlabels']}>Email Address:</div>
                <input
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={ev => setEmail(ev.target.value)}
                    className={styles["inputBox"]} />
                <label className={styles["errorLabel"]}>{emailError}</label>
            </div>
            <br />
            <div className={styles["inputContainer"]}>
                <div className={styles['inputlabels']}>Password:</div>
                <input
                    value={password}
                    type={
                        showPassword ? "text" : "password"
                    }
                    placeholder="Enter Password"
                    onChange={ev => setPassword(ev.target.value)}
                    className={styles["inputBox"]} />
                <label className={styles["errorLabel"]}>{passwordError}</label>
            </div>
            <br />
            <div className={styles["buttonContainer"]}>
                <div className={styles["inputContainer"]}>
                    <input
                        className={styles["inputButton"]}
                        type="button"
                        onClick={useButton}
                        value={"Login"} />
                </div>
                <div className={styles["inputContainer"]}>
                    <input
                        className={styles["inputButton"]}
                        type="button"
                        onClick={useButton}
                        value={"Reset Password"} />
                </div>
            </div>
        </div>
    )
}

export default Login;