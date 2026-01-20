import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-root">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">SkillFit</span>
          </h1>
          <p className="hero-subtitle">
            Connect talented students with amazing opportunities. 
            Take assessments, discover jobs, and grow your career.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={() => navigate("/auth?type=student")}
            >
              🎓 I'm a Student
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => navigate("/auth?type=recruiter")}
            >
              💼 I'm a Recruiter
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">📊</div>
          <div className="floating-card card-2">💼</div>
          <div className="floating-card card-3">🎯</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose SkillFit?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Skill Assessment</h3>
            <p>Take comprehensive skill assessments to showcase your abilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Job Matching</h3>
            <p>Get matched with jobs that fit your skill level and interests</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Career Growth</h3>
            <p>Track your progress and improve your skills over time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Direct Connection</h3>
            <p>Connect directly with recruiters and explore opportunities</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join SkillFit today and take the next step in your career journey</p>
        <button 
          className="btn-primary btn-large" 
          onClick={() => navigate("/auth")}
        >
          Get Started Now
        </button>
      </section>
    </div>
  );
}

