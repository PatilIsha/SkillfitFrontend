import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  // Refs
  const nameFieldRef = useRef(null);
  const confirmFieldRef = useRef(null);
  const successRef = useRef(null);
  const submitBtnRef = useRef(null);
  const loaderRef = useRef(null);
  const formRef = useRef(null);
  const blobRef = useRef(null);

  // Blob animation
  useEffect(() => {
    const blobPaths = [
      "M120,-134.9C151.8,-100.5,171.7,-50.2,162.3,-7.6C152.8,35,114.1,70.1,76.3,96.2C38.5,122.4,1.5,139.6,-39.3,137.5C-80.1,135.4,-124.7,113.9,-138.7,78.6C-152.8,43.3,-136.4,-6,-112.2,-53.8C-88,-101.6,-56,-147.9,-13.6,-151.3C28.9,-154.8,57.8,-115.6,120,-134.9Z",
      "M116.9,-112.1C147.2,-83.7,158.5,-36.7,153.2,11.3C147.8,59.3,125.8,108.3,86.3,128.6C46.9,148.8,-10,140.2,-58.1,116.9C-106.2,93.5,-145.4,55.4,-153.5,10.1C-161.6,-35.2,-138.6,-87.6,-96.7,-117.5C-54.7,-147.3,-2.9,-154.6,45.6,-147.1C94,-139.6,138.1,-117.1,116.9,-112.1Z"
    ];

    let step = 0;
    function animate() {
      step = (step + 1) % blobPaths.length;
      blobRef.current.setAttribute("d", blobPaths[step]);
      setTimeout(animate, 3000);
    }

    blobRef.current.setAttribute("d", blobPaths[0]);
    animate();
  }, []);

  // Toggle Login / Signup
  const toggleTabs = (login) => {
    setIsLogin(login);
    successRef.current.style.display = "none";
    formRef.current.reset();
  };

  // Handle Login + Signup
 const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const fullName = e.target.fullName?.value;

  submitBtnRef.current.style.display = "none";
  loaderRef.current.style.display = "block";

  try {
    let response;

    if (isLogin) {
      response = await axios.post("http://localhost:8080/api/auth/login", { email });
    } else {
      response = await axios.post("http://localhost:8080/api/auth/register", {
        name: fullName,
        email
      });
    }

    if (response.data.studentId) {
      localStorage.setItem("studentId", response.data.studentId);
    }

    if (response.data.name) {     // 👈 save username
      localStorage.setItem("username", response.data.name);
    }

    loaderRef.current.style.display = "none";
    successRef.current.style.display = "flex";

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);

  } catch (err) {
    console.error(err);
    alert("Authentication failed. Check backend logs.");
    loaderRef.current.style.display = "none";
    submitBtnRef.current.style.display = "block";
  }
};


  return (
    <div className="auth-root">
      <div className="blob-bg">
        <svg viewBox="0 0 600 600">
          <g transform="translate(300,300)">
            <path id="blob" ref={blobRef} fill="#0ff"></path>
          </g>
        </svg>
      </div>

      <div className="form-wrapper">
        <div className="tab-toggle">
          <span className={isLogin ? "active" : ""} onClick={() => toggleTabs(true)}>
            Login
          </span>
          <span className={!isLogin ? "active" : ""} onClick={() => toggleTabs(false)}>
            Signup
          </span>
        </div>

        <div className="form-container">
          <form id="authForm" ref={formRef} onSubmit={handleSubmit}>
            <h2 id="formTitle">{isLogin ? "Login" : "Signup"}</h2>

            {!isLogin && (
              <input name="fullName" type="text" placeholder="Full Name" required />
            )}

            <input name="email" type="email" placeholder="Email" required />

            <input name="password" type="password" placeholder="Password" required />

            {!isLogin && (
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            )}

            <div className="submit-area">
              <button type="submit" ref={submitBtnRef}>
                {isLogin ? "Login" : "Signup"}
              </button>
              <div className="loader" ref={loaderRef}></div>
            </div>

            <div id="successMsg" className="success-area" ref={successRef}>
              <p>✅ Success!</p>
              <button onClick={() => (window.location.href = "/")}>
                Go to Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
