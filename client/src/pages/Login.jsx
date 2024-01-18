import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UI/Login.module.css";
import { loginUserApi } from "../api/Login";
import nyplogo from "../assets/images/nyplogo.png";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole || userRole === "") {
      return;
    } else if (userRole === "regular") {
      navigate("/studentform");
    } else if (userRole === "admin") {
      navigate("/teacherlanding");
    } else {
      localStorage.setItem("userRole", "");
      console.error("Invalid User Role");
    }
  });

  const useButton = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length <= 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
      const data = await loginUserApi(email, password);
      localStorage.setItem("userRole", data.userRole);
      navigate(0);
    } catch (error) {
      console.error(error.message);
      setEmailError(error.message);
    }
  };
  return (
    <div class="d-flex align-items-center py-4" style={{ height: 100 + "%" }}>
      <main class="form-signin w-100 m-auto">
        <form>
          <img class="mb-4" src={nyplogo} alt="" />
          <div class="input-group has-validation">
            <div class={"form-floating " + (emailError ? "is-invalid" : "")}>
              <input
                type="email"
                class={"form-control " + (emailError ? "is-invalid" : "")}
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <label for="floatingInput">Email Address</label>
            </div>
            <div class="invalid-feedback">{emailError}</div>
          </div>
          <div class="input-group has-validation">
            <div class={"form-floating " + (passwordError ? "is-invalid" : "")}>
              <input
                type="password"
                class={"form-control " + (passwordError ? "is-invalid" : "")}
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="invalid-feedback">{passwordError}</div>
          </div>
          <div class="form-check text-start my-3">
            <a
              href="#"
              class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Forgot Password?
            </a>
          </div>
          <button
            class="btn btn-primary w-100 py-2"
            type="button"
            onClick={useButton}
          >
            Sign in
          </button>
          <p class="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
