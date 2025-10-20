import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import Notify from "../notify/notify";
import { register, error, success } from "../../utils/taskApi";

export default function Register() {
  const nav = useNavigate();

  const username = useRef(null);
  const password = useRef(null);
  const email = useRef(null);

  const handleRegister = async (username, password, email) => {
   
    if (username == "" || password == "" || email == "") {
      return error("Fill them");
    }
    register(username, password, email).then(() =>{ nav("/login")});
  };
  return (
    <div className="register-main">
      <Notify/>
      <div className="registerContainer">
        <div className="register-header ">To Do</div>
        <div className="register-body">
          <div
            ref={username}
            className="username-container"
            contentEditable="true"
          ></div>
          <div
            ref={password}
            className="password-container"
            contentEditable="true"
          ></div>
          <div
            ref={email}
            className="email-container"
            contentEditable="true"
          ></div>
          <div className="submit-container">
            <button
              className="submit-btn"
              onClick={() =>
                handleRegister(
                  username.current?.textContent,
                  password.current?.textContent,
                  email.current?.textContent
                )
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
