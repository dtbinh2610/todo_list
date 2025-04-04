import { useRef } from "react";
import "./register.css";
import { Link } from "react-router-dom";
export default function Register() {
  const divRefs = {
    username: useRef(null),
    password: useRef(null),
    email: useRef(null),
  };
  return (
    <div className="register-main">
      <div className="registerContainer">
        <div className="register-header ">To Do</div>
        <div className="register-body">
          <div
            ref={divRefs.username}
            className="username-container"
            contentEditable="true"
          ></div>
          <div
            ref={divRefs.password}
            className="password-container"
            contentEditable="true"
          ></div>
           <div
            ref={divRefs.email}
            className="email-container"
            contentEditable="true"
          ></div>
          <div className="submit-container">
            <button className="submit-btn">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
