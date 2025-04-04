import "./login.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ BASE_URL }) {
  const [users, setUser] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nav = useNavigate();

  const handleLogin = () => {
    const email = emailRef.current?.textContent.trim();
    const password = passwordRef.current?.textContent.trim();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    fetch(`${BASE_URL}/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi đăng nhập");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Thành công:", result);
        
        // ✅ Lưu user vào sessionStorage
        sessionStorage.setItem("user", JSON.stringify(result));

        setUser(result);
        nav("/app"); // Chuyển trang
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  return (
    <div className="login-main">
      <div className="loginContainer">
        <div className="login-header">To Do</div>
        <div className="login-body">
          <div ref={emailRef} className="username-container" contentEditable="true"></div>
          <div ref={passwordRef} className="password-container" contentEditable="true"></div>
          <div className="submit-container">
            <button className="submit-btn" onClick={handleLogin}>Submit</button>
          </div>
          <div className="register-nav-container">
            <Link className="register-nav" to={"/Register"}>
              Don't have an account yet?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
