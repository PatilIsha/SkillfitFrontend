import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./recrutier.css"; // paste your SAME CSS in this file

export default function RecruiterAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const cardRef = useRef(null);

  // Switch between tabs
  const showPanel = (mode) => {
    setIsLogin(mode === "login");
  };

  // Handle Login/Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = cardRef.current;
    const form = e.target;
    const email = form.email?.value;
    const password = form.password?.value;
    const fullName = form.fullName?.value;

    if (!email || !password || (!isLogin && !fullName)) {
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await axios.post("http://localhost:8080/api/recruiter/login", { email, password });
      } else {
        response = await axios.post("http://localhost:8080/api/recruiter/register", {
          name: fullName,
          email,
          password,
        });
      }

      // Store data in localStorage
      if (response.data.recruiterId) {
        localStorage.setItem("recruiterId", response.data.recruiterId);
      }
      if (response.data.name) {
        localStorage.setItem("recruiterName", response.data.name);
      }

      window.location.href = "/recruiter-dashboard"; // Redirect
    } catch (err) {
      alert("Authentication failed. Check backend logs.");
      console.error(err);
    }
  };

  return (
    <>
      {/* Background */}
      <div className="bg">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
        <div className="grain"></div>
      </div>

      <main className="wrap">
        <h1>Recruiter Login</h1>
        <div className="card" ref={cardRef} role="region" aria-label="Authentication panel">
            

          {/* TABS */}
          <nav className="tabs" role="tablist">
            <button
              className={`tab ${isLogin ? "is-active" : ""}`}
              onClick={() => showPanel("login")}
            >
              Login
            </button>
            <button
              className={`tab ${!isLogin ? "is-active" : ""}`}
              onClick={() => showPanel("signup")}
            >
              Signup
            </button>
          </nav>

          {/* LOGIN FORM */}
          {isLogin ? (
            <section className="panel is-active">
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <input name="email" type="email" required placeholder=" " />
                  <label>Email</label>
                </div>
                <div className="field">
                  <input name="password" type="password" required placeholder=" " />
                  <label>Password</label>
                </div>
                <button className="btn" type="submit">Log in</button>
                <p className="hint">
                  No account? <a onClick={() => showPanel("signup")} href="#">Create one</a>
                </p>
              </form>
            </section>
          ) : (
            /* SIGNUP FORM */
            <section className="panel is-active">
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <input name="fullName" type="text" required placeholder=" " />
                  <label>Full Name</label>
                </div>
                <div className="field">
                  <input name="email" type="email" required placeholder=" " />
                  <label>Email</label>
                </div>
                <div className="field">
                  <input name="password" type="password" required placeholder=" " />
                  <label>Create Password</label>
                </div>
                <button className="btn" type="submit">Create account</button>
                <p className="hint">
                  Already have an account? <a onClick={() => showPanel("login")} href="#">Log in</a>
                </p>
              </form>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
