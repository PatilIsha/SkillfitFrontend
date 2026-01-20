import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudentResult, getJobRecommendations, getAllJobs, getReceivedMessages, getUnreadCount, getStudentProfile, updateStudentProfile, getStudentAssessments } from "../api/apiService";
import HomePage from "../pages/student/HomePage";
import "./dashboard.css";

// Sidebar Navigation Component
function StudentSidebar({ activeTab, setActiveTab, name, unreadCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("username");
    navigate("/auth?type=student");
  };

  return (
    <aside style={{
      width: "280px",
      minHeight: "100vh",
      background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,255,255,0.15)",
      padding: "24px 20px",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      overflowY: "auto",
      zIndex: 100,
      boxSizing: "border-box",
    }}>
      {/* Logo */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", 
        marginBottom: "40px",
        paddingBottom: "24px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "800",
          color: "#fff",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
        }}>
          SF
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>SkillFit</div>
          <div style={{ fontSize: "11px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Student</div>
        </div>
      </div>

      {/* Menu Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ 
          fontSize: "11px", 
          color: "#fff", 
          fontWeight: "700", 
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "16px",
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          opacity: 0.9
        }}>
          MENU
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { id: "home", label: "Home", icon: "🏠" },
            { id: "jobs", label: "Available Jobs", icon: "💼" },
            { id: "assessments", label: "My Assessments", icon: "📝" },
            { id: "messages", label: "Messages", icon: "💬", badge: unreadCount },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                background: activeTab === item.id 
                  ? "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)"
                  : "transparent",
                color: "#fff",
                fontSize: "15px",
                fontWeight: activeTab === item.id ? "700" : "600",
                textShadow: activeTab === item.id ? "0 1px 4px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
                width: "100%",
                border: activeTab === item.id ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{
                  background: "#ff6b6b",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* General Section */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ 
          fontSize: "11px", 
          color: "#fff", 
          fontWeight: "700", 
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "16px",
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          opacity: 0.9
        }}>
          GENERAL
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { id: "profile", label: "Profile", icon: "👤" },
            { id: "settings", label: "Settings", icon: "⚙️" },
            { id: "help", label: "Help", icon: "❓" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                background: "transparent",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#fff";
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              background: "transparent",
              color: "rgba(255,100,100,0.9)",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
              width: "100%",
              marginTop: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,100,100,0.15)";
              e.currentTarget.style.color = "#ff6b6b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(255,100,100,0.9)";
            }}
          >
            <span style={{ fontSize: "18px" }}>🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* User Info at Bottom */}
      <div style={{
        marginTop: "auto",
        padding: "16px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div className="sf-avatar" style={{ width: "36px", height: "36px", fontSize: "14px" }}>
            {name?.charAt(0)?.toUpperCase() || "S"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{name}</div>
            <div style={{ fontSize: "11px", color: "#fff", fontWeight: "500", textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: 0.95 }}>Student</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Top Bar Component
function TopBar({ name, onRefresh }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.2)",
      marginBottom: "24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <input
          type="text"
          placeholder="🔍 Search jobs, assessments..."
          style={{
            flex: 1,
            maxWidth: "400px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            fontSize: "14px",
          }}
          onFocus={(e) => {
            e.target.style.background = "rgba(255,255,255,0.15)";
            e.target.style.borderColor = "rgba(255,255,255,0.3)";
          }}
          onBlur={(e) => {
            e.target.style.background = "rgba(255,255,255,0.1)";
            e.target.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          className="sf-btn ghost"
          onClick={onRefresh}
          style={{ padding: "10px 16px", fontSize: "13px" }}
        >
          🔄 Refresh
        </button>
        <div className="sf-profile">
          <div className="sf-avatar">{name?.charAt(0)?.toUpperCase() || "S"}</div>
          <div className="sf-name" style={{ fontSize: "13px" }}>{name}</div>
        </div>
      </div>
    </div>
  );
}

// Student Profile Component
function StudentProfile({ studentId }) {
  const [profile, setProfile] = useState({ name: "", email: "", college: "", degree: "", resumePath: "" });
  const [formData, setFormData] = useState({ name: "", email: "", college: "", degree: "", resume: null });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (studentId) {
      loadProfile();
    } else {
      setLoading(false);
      alert("Student ID not found. Please login again.");
    }
  }, [studentId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      // Convert studentId to number if it's a string
      const id = typeof studentId === 'string' ? parseInt(studentId) : studentId;
      
      if (!id || isNaN(id)) {
        throw new Error("Invalid student ID");
      }
      
      const res = await getStudentProfile(id);
      if (res.data) {
        if (res.data.error) {
          throw new Error(res.data.message || "Student not found");
        }
        setProfile({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          college: res.data.college || "",
          degree: res.data.degree || "",
          resumePath: res.data.resumePath || ""
        });
        setFormData({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          college: res.data.college || "",
          degree: res.data.degree || "",
          resume: null
        });
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      let errorMessage = "Unknown error occurred";
      
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        errorMessage = "Cannot connect to backend server. Please ensure the Spring Boot server is running on http://localhost:8080";
      } else if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText || "Server error";
      } else {
        errorMessage = err.message || "Network Error";
      }
      
      setError(errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, we'll just store the file name
      // In a real app, you'd upload to a server
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        college: formData.college.trim(),
        degree: formData.degree.trim(),
      };
      
      // If resume file is selected, you would upload it here
      // For now, we'll just keep the existing resumePath
      if (formData.resume) {
        // In a real implementation, upload file and get path
        // updateData.resumePath = uploadedPath;
        alert("Resume upload functionality will be implemented with file upload service.");
      }

      const res = await updateStudentProfile(studentId, updateData);
      
      if (res.data && res.data.id) {
        setProfile({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          college: res.data.college || "",
          degree: res.data.degree || "",
          resumePath: res.data.resumePath || ""
        });
        setFormData({ ...formData, resume: null });
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (!studentId) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>👤 Profile</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#ff6b6b" }}>
          Student ID not found. Please login again.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>👤 Profile</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>👤 Profile</h2>
        <div style={{ 
          padding: "24px", 
          background: "rgba(255,100,100,0.1)", 
          borderRadius: "12px",
          border: "1px solid rgba(255,100,100,0.3)",
          marginTop: "20px"
        }}>
          <div style={{ color: "#ff6b6b", fontSize: "16px", fontWeight: "600", marginBottom: "12px" }}>
            ⚠️ Error Loading Profile
          </div>
          <div style={{ color: "#ffaaaa", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
            {error}
          </div>
          <button 
            className="sf-btn" 
            onClick={() => {
              setError(null);
              loadProfile();
            }}
            style={{ marginTop: "12px" }}
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sf-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)", margin: 0 }}>👤 Profile Information</h2>
        {!isEditing && (
          <button className="sf-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {!isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{
            padding: "20px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Full Name
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.name || "Not set"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Email Address
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.email || "Not set"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                College/University
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.college || "Not set"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Degree Details
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.degree || "Not set"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Resume
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.resumePath ? (
                  <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" style={{ color: "#00f0ff", textDecoration: "none" }}>
                    📄 View Resume
                  </a>
                ) : "Not uploaded"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
              College/University
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              placeholder="Enter your college or university name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
              Degree Details
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g., B.Tech Computer Science, MCA, etc."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
              Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px"
              }}
            />
            {formData.resume && (
              <div style={{ marginTop: "8px", color: "#9deff0", fontSize: "13px" }}>
                Selected: {formData.resume.name}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="sf-btn" disabled={saving}>
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>
            <button type="button" className="sf-btn ghost" onClick={() => {
              setIsEditing(false);
              setFormData({ 
                name: profile.name, 
                email: profile.email,
                college: profile.college,
                degree: profile.degree,
                resume: null
              });
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// Available Jobs Component
function AvailableJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      const jobsData = res?.data;
      const jobsArray = Array.isArray(jobsData) ? jobsData : [];
      setJobs(jobsArray);
    } catch (err) {
      console.error("Error loading jobs:", err);
      alert("Error loading jobs: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>💼 Available Jobs</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          Loading jobs...
        </div>
      </div>
    );
  }

  // Group jobs by company
  const jobsByCompany = jobs.reduce((acc, job) => {
    const companyName = job.companyName || "General";
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(job);
    return acc;
  }, {});

  return (
    <div className="sf-card">
      <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)", marginBottom: "24px" }}>💼 Available Jobs</h2>
      {jobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          No jobs available at the moment. Check back later!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {Object.entries(jobsByCompany).map(([companyName, companyJobs]) => (
            <div key={companyName} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{
                padding: "12px 16px",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(102, 126, 234, 0.3)",
                marginBottom: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>🏢</span>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: "18px", 
                    fontWeight: "800", 
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.3)"
                  }}>
                    {companyName}
                  </h4>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}>
                    {companyJobs.length} {companyJobs.length === 1 ? 'job' : 'jobs'}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "8px" }}>
                {companyJobs.map((job) => (
            <div 
              key={job.id} 
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: "700", 
                    color: "#fff", 
                    fontSize: "20px", 
                    marginBottom: "8px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)"
                  }}>
                    {job.role}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: job.level === "Expert" || job.level === "Advanced" 
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)"
                          : job.level === "Intermediate" 
                          ? "linear-gradient(135deg, rgba(244,180,0,0.9) 0%, rgba(255,193,7,0.9) 100%)"
                          : "linear-gradient(135deg, rgba(108,117,125,0.8) 0%, rgba(73,80,87,0.8) 100%)",
                        color: job.level === "Intermediate" ? "#000" : "#fff",
                        fontSize: "12px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                      }}
                    >
                      {job.level}
                    </span>
                    {job.companyName && (
                      <div style={{ fontSize: "13px", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "16px" }}>🏢</span>
                        <strong style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)", fontWeight: "700" }}>
                          {job.companyName}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ 
                fontSize: "14px", 
                lineHeight: "1.6", 
                color: "#bfeff0", 
                marginBottom: "16px" 
              }}>
                {job.description || "No description available"}
              </div>
              <button
                className="sf-btn"
                onClick={() => window.location.href = `/student/quiz?jobId=${job.id}`}
                style={{
                  fontSize: "14px",
                  padding: "10px 20px",
                }}
              >
                📝 Attempt Test for This Job
              </button>
            </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// My Assessments Component
function MyAssessments({ studentId }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      loadAssessments();
    }
  }, [studentId]);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const id = typeof studentId === 'string' ? parseInt(studentId) : studentId;
      const res = await getStudentAssessments(id);
      if (res.data && res.data.assessments) {
        setAssessments(res.data.assessments);
      }
    } catch (err) {
      console.error("Error loading assessments:", err);
      alert("Error loading assessments: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    const levelLower = level?.toLowerCase() || "beginner";
    if (levelLower === "expert" || levelLower === "advanced") {
      return { color: "#00f0ff", bg: "rgba(0,240,255,0.15)" };
    } else if (levelLower === "intermediate") {
      return { color: "#f4b400", bg: "rgba(244,180,0,0.15)" };
    } else {
      return { color: "#6c757d", bg: "rgba(108,117,125,0.15)" };
    }
  };

  if (loading) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>📝 My Assessments</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          Loading assessments...
        </div>
      </div>
    );
  }

  return (
    <div className="sf-card">
      <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)", marginBottom: "24px" }}>📝 My Assessments</h2>
      {assessments.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#9deff0",
          fontSize: "16px"
        }}>
          No assessments taken yet. Take your first assessment to see results here!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {assessments.map((assessment, index) => {
            const levelInfo = getLevelColor(assessment.level);
            const percentage = assessment.totalQuestions > 0 
              ? Math.round((assessment.score / assessment.totalQuestions) * 100) 
              : 0;
            
            return (
              <div
                key={assessment.id}
                style={{
                  padding: "20px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px",
                      marginBottom: "8px"
                    }}>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "16px"
                      }}>
                        #{index + 1}
                      </span>
                      <div>
                        <div style={{ 
                          fontSize: "18px", 
                          fontWeight: "700", 
                          color: "#fff",
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)"
                        }}>
                          Assessment {index + 1}
                        </div>
                        <div style={{ 
                          fontSize: "13px", 
                          color: "#9deff0",
                          marginTop: "4px"
                        }}>
                          {assessment.takenAt 
                            ? new Date(assessment.takenAt).toLocaleString()
                            : "Date not available"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: levelInfo.bg,
                    border: `1px solid ${levelInfo.color}`,
                    color: levelInfo.color,
                    fontSize: "14px",
                    fontWeight: "700"
                  }}>
                    {assessment.level}
                  </div>
                </div>
                
                <div style={{ marginTop: "16px" }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "8px"
                  }}>
                    <span style={{ color: "#9deff0", fontSize: "14px" }}>Percentage</span>
                    <span style={{ 
                      color: "#00f0ff", 
                      fontSize: "20px", 
                      fontWeight: "700"
                    }}>
                      {percentage}%
                    </span>
                  </div>
                  <div style={{ 
                    width: "100%", 
                    height: "8px", 
                    background: "rgba(255,255,255,0.1)", 
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: "100%", 
                      background: "linear-gradient(90deg,#00f0ff,#4ad9d9)",
                      transition: "width 0.3s ease"
                    }}></div>
                  </div>
                  <div style={{ 
                    textAlign: "right", 
                    marginTop: "4px",
                    color: "#9deff0",
                    fontSize: "12px"
                  }}>
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Student Messages Component
function StudentMessages({ studentId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (studentId) {
      loadMessages();
    }
  }, [studentId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const id = typeof studentId === 'string' ? parseInt(studentId) : studentId;
      const res = await getReceivedMessages(id);
      if (res.data) {
        // Filter only messages from recruiters
        const recruiterMessages = res.data.filter(msg => msg.senderType === 'recruiter');
        setMessages(recruiterMessages);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      alert("Error loading messages: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="sf-card">
        <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>💬 Messages</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="sf-card">
      <h2 style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)", marginBottom: "24px" }}>💬 Messages from Recruiters</h2>
      {messages.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#9deff0",
          fontSize: "16px"
        }}>
          No messages from recruiters yet. Keep taking assessments to receive job opportunities!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                padding: "20px",
                background: selectedMessage === message.id 
                  ? "rgba(0,240,255,0.1)" 
                  : "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: selectedMessage === message.id
                  ? "1px solid rgba(0,240,255,0.3)"
                  : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
              onMouseEnter={(e) => {
                if (selectedMessage !== message.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMessage !== message.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: "16px", 
                    fontWeight: "700", 
                    color: "#fff",
                    marginBottom: "6px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)"
                  }}>
                    {message.subject || "No Subject"}
                  </div>
                  <div style={{ 
                    fontSize: "13px", 
                    color: "#9deff0",
                    marginBottom: "4px"
                  }}>
                    From: <strong>{message.senderName || "Recruiter"}</strong>
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#bfeff0",
                    opacity: 0.8
                  }}>
                    {message.sentAt 
                      ? new Date(message.sentAt).toLocaleString()
                      : "Date not available"}
                  </div>
                </div>
                <div style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "rgba(0,240,255,0.15)",
                  color: "#00f0ff",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  Recruiter
                </div>
              </div>
              
              {selectedMessage === message.id && (
                <div style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ 
                    color: "#fff", 
                    fontSize: "14px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap"
                  }}>
                    {message.message || "No message content"}
                  </div>
                </div>
              )}
              
              {selectedMessage !== message.id && (
                <div style={{ 
                  color: "#bfeff0", 
                  fontSize: "13px",
                  marginTop: "8px",
                  opacity: 0.9
                }}>
                  {message.message && message.message.length > 100
                    ? message.message.substring(0, 100) + "..."
                    : message.message || "No message content"}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentWebsite() {
  const studentIdStr = localStorage.getItem("studentId");
  const studentId = studentIdStr ? (isNaN(parseInt(studentIdStr)) ? studentIdStr : parseInt(studentIdStr)) : null;
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [studentName, setStudentName] = useState("Student");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Ensure body and html allow scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    if (!studentId) {
      navigate("/auth?type=student");
      return;
    }

    // Load student name and unread count
    getStudentResult(studentId)
      .then((res) => {
        const data = res.data || {};
        setStudentName(data.studentName || "Student");
      })
      .catch((err) => console.error("Error loading student:", err));

    getUnreadCount(studentId)
      .then((res) => {
        setUnreadCount(res.data || 0);
      })
      .catch((err) => console.error("Error loading unread count:", err));
  }, [studentId, navigate]);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Determine active tab from route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/jobs")) setActiveTab("jobs");
    else if (path.includes("/assessments")) setActiveTab("assessments");
    else if (path.includes("/messages")) setActiveTab("messages");
    else if (path.includes("/profile")) setActiveTab("profile");
    else setActiveTab("home");
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "jobs") navigate("/student/jobs");
    else if (tab === "assessments") navigate("/student/assessments");
    else if (tab === "messages") navigate("/student/messages");
    else if (tab === "profile") navigate("/student/profile");
    else navigate("/student/dashboard");
  };

  return (
    <div className="sf-dashboard-root" style={{ padding: 0, display: "flex", margin: 0, overflow: "hidden" }}>
      <StudentSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        name={studentName}
        unreadCount={unreadCount}
      />

      <main style={{ 
        marginLeft: "280px", 
        flex: 1, 
        padding: "24px 32px",
        minHeight: "100vh",
        width: "calc(100% - 280px)",
        boxSizing: "border-box"
      }}>
        <TopBar name={studentName} onRefresh={handleRefresh} />

        {activeTab === "home" && <HomePage />}
        {activeTab === "jobs" && <AvailableJobs />}
        {activeTab === "assessments" && <MyAssessments studentId={studentId} />}
        {activeTab === "messages" && <StudentMessages studentId={studentId} />}
        {activeTab === "profile" && <StudentProfile studentId={studentId} />}
      </main>
    </div>
  );
}

