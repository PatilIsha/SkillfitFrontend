import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export default function UnifiedAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("type") || "student"; // "student" or "recruiter"
  const [isLogin, setIsLogin] = useState(true);
  const [selectedType, setSelectedType] = useState(userType);
  const [otpSent, setOtpSent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingName, setPendingName] = useState("");

  // Refs
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const loaderRef = useRef(null);
  const successRef = useRef(null);
  const blobRef = useRef(null);
  const otpFormRef = useRef(null);

  // Blob animation
  useEffect(() => {
    const blobPaths = [
      "M120,-134.9C151.8,-100.5,171.7,-50.2,162.3,-7.6C152.8,35,114.1,70.1,76.3,96.2C38.5,122.4,1.5,139.6,-39.3,137.5C-80.1,135.4,-124.7,113.9,-138.7,78.6C-152.8,43.3,-136.4,-6,-112.2,-53.8C-88,-101.6,-56,-147.9,-13.6,-151.3C28.9,-154.8,57.8,-115.6,120,-134.9Z",
      "M116.9,-112.1C147.2,-83.7,158.5,-36.7,153.2,11.3C147.8,59.3,125.8,108.3,86.3,128.6C46.9,148.8,-10,140.2,-58.1,116.9C-106.2,93.5,-145.4,55.4,-153.5,10.1C-161.6,-35.2,-138.6,-87.6,-96.7,-117.5C-54.7,-147.3,-2.9,-154.6,45.6,-147.1C94,-139.6,138.1,-117.1,116.9,-112.1Z"
    ];

    let step = 0;
    function animate() {
      step = (step + 1) % blobPaths.length;
      if (blobRef.current) {
        blobRef.current.setAttribute("d", blobPaths[step]);
        setTimeout(animate, 3000);
      }
    }

    if (blobRef.current) {
      blobRef.current.setAttribute("d", blobPaths[0]);
      animate();
    }
  }, []);

  // Toggle Login / Signup
  const toggleTabs = (login) => {
    setIsLogin(login);
    setOtpSent(false);
    setPendingEmail("");
    setPendingName("");
    if (successRef.current) successRef.current.style.display = "none";
    if (formRef.current) formRef.current.reset();
    if (otpFormRef.current) otpFormRef.current.reset();
  };

  // Handle Login + Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const fullName = e.target.fullName?.value;
    const password = e.target.password?.value;
    const confirmPassword = e.target.confirmPassword?.value;

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (submitBtnRef.current) submitBtnRef.current.style.display = "none";
    if (loaderRef.current) loaderRef.current.style.display = "block";

    try {
      let response;
      const isStudent = selectedType === "student";

      if (isLogin) {
        if (isStudent) {
          response = await axios.post("http://localhost:8080/api/auth/login", { email });
        } else {
          response = await axios.post("http://localhost:8080/api/recruiter/login", { 
            email, 
            password 
          });
        }
      } else {
        // Registration - Send OTP
        if (isStudent) {
          response = await axios.post("http://localhost:8080/api/auth/register", {
            name: fullName,
            email
          });
        } else {
          response = await axios.post("http://localhost:8080/api/recruiter/register", {
            name: fullName,
            email,
            password
          });
        }
        
        // Check if OTP was sent successfully
        if (response.data.success) {
          setOtpSent(true);
          setPendingEmail(email);
          setPendingName(fullName);
          if (loaderRef.current) loaderRef.current.style.display = "none";
          if (submitBtnRef.current) submitBtnRef.current.style.display = "block";
          alert("OTP sent to your email! Please check your inbox and enter the OTP below.");
          return;
        } else {
          throw new Error(response.data.message || "Failed to send OTP");
        }
      }

      // Handle Login response
      // Handle Student response
      if (isStudent && response.data.studentId) {
        localStorage.setItem("studentId", response.data.studentId);
        if (response.data.name) {
          localStorage.setItem("username", response.data.name);
        }
        if (loaderRef.current) loaderRef.current.style.display = "none";
        if (successRef.current) successRef.current.style.display = "flex";
        setTimeout(() => {
          navigate("/student/dashboard");
        }, 1500);
      }
      // Handle Recruiter response
      else if (!isStudent && response.data.recruiterId) {
        localStorage.setItem("recruiterId", response.data.recruiterId);
        if (response.data.name) {
          localStorage.setItem("recruiterName", response.data.name);
        }
        if (loaderRef.current) loaderRef.current.style.display = "none";
        if (successRef.current) successRef.current.style.display = "flex";
        setTimeout(() => {
          navigate("/recruiter/dashboard");
        }, 1500);
      } else {
        throw new Error(response.data.message || "Authentication failed");
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed. Please check your credentials.");
      if (loaderRef.current) loaderRef.current.style.display = "none";
      if (submitBtnRef.current) submitBtnRef.current.style.display = "block";
    }
  };

  // Handle OTP Verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    if (submitBtnRef.current) submitBtnRef.current.style.display = "none";
    if (loaderRef.current) loaderRef.current.style.display = "block";

    try {
      const isStudent = selectedType === "student";
      let response;
      
      if (isStudent) {
        response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
          email: pendingEmail,
          otp: otp
        });
      } else {
        response = await axios.post("http://localhost:8080/api/recruiter/verify-otp", {
          email: pendingEmail,
          otp: otp
        });
      }

      if (response.data.success) {
        // Handle Student response
        if (isStudent && response.data.studentId) {
          localStorage.setItem("studentId", response.data.studentId);
          if (response.data.name) {
            localStorage.setItem("username", response.data.name);
          }
          if (loaderRef.current) loaderRef.current.style.display = "none";
          if (successRef.current) successRef.current.style.display = "flex";
          setTimeout(() => {
            navigate("/student/dashboard");
          }, 1500);
        }
        // Handle Recruiter response
        else if (!isStudent && response.data.recruiterId) {
          localStorage.setItem("recruiterId", response.data.recruiterId);
          if (response.data.name) {
            localStorage.setItem("recruiterName", response.data.name);
          }
          if (loaderRef.current) loaderRef.current.style.display = "none";
          if (successRef.current) successRef.current.style.display = "flex";
          setTimeout(() => {
            navigate("/recruiter/dashboard");
          }, 1500);
        }
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid OTP. Please try again.");
      if (loaderRef.current) loaderRef.current.style.display = "none";
      if (submitBtnRef.current) submitBtnRef.current.style.display = "block";
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
        {/* User Type Selection */}
        <div className="user-type-toggle" style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          justifyContent: "center"
        }}>
          <button
            type="button"
            onClick={() => {
              setSelectedType("student");
              navigate("/auth?type=student");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: selectedType === "student" 
                ? "rgba(255,255,255,0.3)" 
                : "rgba(255,255,255,0.1)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              border: selectedType === "student" ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent"
            }}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedType("recruiter");
              navigate("/auth?type=recruiter");
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: selectedType === "recruiter" 
                ? "rgba(255,255,255,0.3)" 
                : "rgba(255,255,255,0.1)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              border: selectedType === "recruiter" ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent"
            }}
          >
            💼 Recruiter
          </button>
        </div>

        <div className="tab-toggle">
          <span className={isLogin ? "active" : ""} onClick={() => toggleTabs(true)}>
            Login
          </span>
          <span className={!isLogin ? "active" : ""} onClick={() => toggleTabs(false)}>
            Signup
          </span>
        </div>

        <div className="form-container">
          {!otpSent ? (
            <form id="authForm" ref={formRef} onSubmit={handleSubmit}>
              <h2 id="formTitle">
                {isLogin ? "Login" : "Signup"} as {selectedType === "student" ? "Student" : "Recruiter"}
              </h2>

              {!isLogin && (
                <input name="fullName" type="text" placeholder="Full Name" required />
              )}

              <input name="email" type="email" placeholder="Email" required />

              <input 
                name="password" 
                type="password" 
                placeholder={selectedType === "recruiter" || !isLogin ? "Password" : "Password (optional for students)"} 
                required={selectedType === "recruiter" || !isLogin}
              />

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
                <p style={{ fontSize: "14px", marginTop: "8px" }}>Redirecting...</p>
              </div>
            </form>
          ) : (
            <form id="otpForm" ref={otpFormRef} onSubmit={handleOtpVerify}>
              <h2 id="formTitle">Verify Your Email</h2>
              
              <div style={{ 
                background: "rgba(255,255,255,0.1)", 
                padding: "16px", 
                borderRadius: "8px", 
                marginBottom: "20px",
                textAlign: "center"
              }}>
                <p style={{ color: "#fff", margin: "0 0 8px 0", fontSize: "14px" }}>
                  OTP sent to:
                </p>
                <p style={{ color: "#00f0ff", margin: 0, fontWeight: "600" }}>
                  {pendingEmail}
                </p>
              </div>

              <input 
                name="otp" 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                required 
                maxLength="6"
                pattern="[0-9]{6}"
                style={{ 
                  textAlign: "center", 
                  fontSize: "24px", 
                  letterSpacing: "8px",
                  fontWeight: "700"
                }}
              />

              <div className="submit-area">
                <button type="submit" ref={submitBtnRef}>
                  Verify OTP
                </button>
                <div className="loader" ref={loaderRef}></div>
              </div>

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setPendingEmail("");
                    setPendingName("");
                    if (otpFormRef.current) otpFormRef.current.reset();
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px"
                  }}
                >
                  ← Back to Registration
                </button>
              </div>

              <div id="successMsg" className="success-area" ref={successRef}>
                <p>✅ Success!</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>Redirecting...</p>
              </div>
            </form>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px"
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

