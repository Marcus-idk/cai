import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UI/Login.module.css";
import { loginUserApi } from "../api/Login";
import nyplogo from "../assets/images/nyplogo.png";
import "animate.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole || userRole === "") {
      return;
    } else if (userRole === "regular") {
      navigate("/studentform");
    } else if (userRole === "admin") {
      navigate("/teacher/");
    } else {
      localStorage.setItem("userRole", "");
      console.error("Invalid User Role");
    }
  });

  const useButton = async () => {
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    if ("" === email) {
      setEmailError("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      setIsLoading(false);
      return;
    }

    if (password.length <= 7) {
      setPasswordError("The password must be 8 characters or longer");
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUserApi(email, password);
      localStorage.setItem("userRole", data.userRole);
      if ("studentID" in data)
        localStorage.setItem("studentID", data.studentID);
      setIsLoading(false);
      navigate(0);
    } catch (error) {
      console.error(error.message);
      setEmailError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div
      className="d-flex align-items-center py-4 animate__animated animate__fadeIn"
      style={{ height: 100 + "%" }}
    >
      <main className="form-signin w-100 m-auto">
        <form>
          <img className="mb-4" src={nyplogo} alt="" />
          <div className="input-group has-validation">
            <div
              className={"form-floating " + (emailError ? "is-invalid" : "")}
            >
              <input
                type="email"
                className={"form-control " + (emailError ? "is-invalid" : "")}
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <label htmlFor="floatingInput">Email Address</label>
            </div>
            <div className="invalid-feedback">{emailError}</div>
          </div>
          <div className="input-group has-validation">
            <div
              className={"form-floating " + (passwordError ? "is-invalid" : "")}
            >
              <input
                type="password"
                className={
                  "form-control " + (passwordError ? "is-invalid" : "")
                }
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="invalid-feedback">{passwordError}</div>
          </div>
          {/* <div className="form-check text-start my-3">
            <a
              href="#"
              className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Forgot Password?
            </a>
          </div> */}
          <button
            className="btn btn-primary w-100 py-2"
            type="button"
            onClick={useButton}
            disabled={loading}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
