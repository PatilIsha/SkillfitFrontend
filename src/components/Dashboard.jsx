import React, { useEffect, useState } from "react";
import { getStudentResult, getJobRecommendations, getAllJobs, getReceivedMessages, getUnreadCount } from "../api/apiService";
import "./dashboard.css";

function Header({ name, unreadCount, onMessagesClick }) {
  return (
    <header className="sf-header">
      <div className="sf-left">
        <div className="sf-logo">SkillFit</div>
      </div>
      <div className="sf-right">
        <div className="sf-welcome">
          <div className="sf-welcome-title">Welcome, <strong>{name}</strong>!</div>
          <div className="sf-welcome-sub">Keep growing your skills every day.</div>
        </div>
        <button
          className="sf-btn ghost"
          onClick={onMessagesClick}
          style={{ position: "relative", marginRight: "12px" }}
        >
          💬 Messages
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
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
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
        <div className="sf-profile">
          <div className="sf-avatar">{name?.charAt(0)?.toUpperCase() || "S"}</div>
          <div className="sf-name">{name}</div>
        </div>
      </div>
    </header>
  );
}

function PerformanceCard({ score, level, totalQuestions = 10 }) {
  // Example category percentages for the chart (mock if you want real)
  const categories = [
    { name: "Backend", value: Math.min(100, Math.max(10, Math.round(score * 0.9))) },
    { name: "Frontend", value: Math.min(100, Math.max(5, Math.round(score * 0.8))) },
    { name: "Database", value: Math.min(100, Math.max(3, Math.round(score * 0.6))) },
    { name: "Testing", value: Math.min(100, Math.max(1, Math.round(score * 0.5))) },
  ];

  return (
    <section className="sf-card sf-performance">
      <h3>📊 Test Performance</h3>

      <div className="sf-score-row">
        <div className="sf-score-block">
          <div className="sf-score-number">{score} <span className="sf-score-out">/ {totalQuestions}</span></div>
          <div className="sf-score-label">Score</div>
        </div>

        <div className="sf-level-block">
          <div className={`sf-level-pill ${level.toLowerCase()}`}>{level} <span className="sf-star">🌟</span></div>
          <div className="sf-level-label">Competency Level</div>
        </div>
      </div>

      <div className="sf-chart">
        <h4>Category-wise performance</h4>
        <div className="sf-bars">
          {categories.map((c) => (
            <div key={c.name} className="sf-bar-row">
              <div className="sf-bar-label">{c.name}</div>
              <div className="sf-bar-bg">
                <div className="sf-bar-fill" style={{ width: `${c.value}%` }} />
              </div>
              <div className="sf-bar-value">{c.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recommendations({ jobs, studentLevel }) {
  return (
    <section className="sf-card sf-jobs" style={{
      background: "linear-gradient(135deg, rgba(240, 147, 251, 0.2) 0%, rgba(79, 172, 254, 0.2) 100%)",
      border: "1px solid rgba(255,255,255,0.25)"
    }}>
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ fontSize: "24px" }}>💼</div>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#fff" }}>
            Career Recommendations
          </h3>
        </div>
        <p style={{ 
          fontSize: "13px", 
          color: "rgba(255,255,255,0.85)", 
          margin: 0,
          fontWeight: "500"
        }}>
          Jobs matching your <strong style={{ color: "#fff" }}>{studentLevel}</strong> level
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {jobs && jobs.length > 0 ? jobs.slice(0, 4).map(job => (
          <div
            key={job.id}
            className="sf-job-item"
            style={{
              padding: "16px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="sf-job-role" style={{ fontSize: "17px", marginBottom: "10px", fontWeight: "800" }}>
              {job.role}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
              >
                {job.level}
              </span>
            </div>
            <div className="sf-job-meta" style={{ fontSize: "13px", lineHeight: "1.6", color: "rgba(255,255,255,0.9)" }}>
              {job.description || "No description available"}
            </div>
          </div>
        )) : <div style={{ 
          textAlign: "center", 
          padding: "30px 20px", 
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px"
        }}>
          No recommendations yet — take a test to get started.
        </div>}
      </div>
    </section>
  );
}

function AllJobsList({ allJobs, loading }) {
  const [filterLevel, setFilterLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = allJobs.filter(job => {
    const matchesLevel = filterLevel === "All" || job.level === filterLevel;
    const matchesSearch = searchTerm === "" || 
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  // Group jobs by company
  const jobsByCompany = filteredJobs.reduce((acc, job) => {
    const companyName = job.companyName || "General";
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(job);
    return acc;
  }, {});

  return (
    <section className="sf-card" style={{ overflow: "visible", maxHeight: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3>💼 All Available Jobs</h3>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="🔍 Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "13px",
              width: "180px",
              transition: "all 0.3s ease",
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
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255,255,255,0.15)";
              e.target.style.borderColor = "rgba(255,255,255,0.3)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#9deff0" }}>Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#9deff0" }}>
          {allJobs.length === 0 ? "No jobs available yet." : "No jobs match your filters."}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxHeight: "none", overflow: "visible" }}>
          {Object.entries(jobsByCompany).map(([companyName, jobs]) => (
            <div key={companyName} style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
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
                    {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "8px" }}>
                {jobs.map((job) => (
            <div
              key={job.id}
              className="sf-job-item"
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
              }}
            >
              <div className="sf-job-role" style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px" }}>
                {job.role}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "10px",
                    background: job.level === "Expert" || job.level === "Advanced"
                      ? "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)"
                      : job.level === "Intermediate"
                      ? "linear-gradient(135deg, rgba(244,180,0,0.9) 0%, rgba(255,193,7,0.9) 100%)"
                      : "linear-gradient(135deg, rgba(108,117,125,0.9) 0%, rgba(73,80,87,0.9) 100%)",
                    color: job.level === "Intermediate" ? "#000" : "#fff",
                    fontSize: "12px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                >
                  {job.level}
                </span>
                {job.companyName && (
                  <div style={{ fontSize: "14px", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "18px" }}>🏢</span>
                    <strong style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)", fontWeight: "700" }}>
                      {job.companyName}
                    </strong>
                  </div>
                )}
              </div>
              <div className="sf-job-meta" style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(255,255,255,0.9)", marginBottom: "16px" }}>
                {job.description || "No description available"}
              </div>
              <button
                className="sf-btn"
                onClick={() => window.location.href = `/student/quiz?jobId=${job.id}`}
                style={{
                  fontSize: "13px",
                  padding: "10px 20px",
                  marginTop: "12px",
                  width: "100%",
                  fontWeight: "700",
                }}
              >
                📝 Attempt Assessment
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Dashboard() {
  const studentId = localStorage.getItem("studentId");
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [result, setResult] = useState({ score: 0, level: "Beginner" });
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Ensure body and html allow scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    if (!studentId) {
      window.location.href = "/auth";
      return;
    }

    // Fetch result and jobs
    setLoading(true);
    Promise.all([
      getStudentResult(studentId),
      getAllJobs()
    ])
      .then(([resultRes, allJobsRes]) => {
        const data = resultRes.data || {};
        setStudentName(data.studentName || "Student");
        const level = data.level || "Beginner";
        setResult({ 
          score: data.score ?? 0, 
          level: level,
          totalQuestions: data.totalQuestions || 10
        });

        // Set all jobs - handle both direct array and wrapped response
        const jobsData = allJobsRes?.data;
        const jobsArray = Array.isArray(jobsData) ? jobsData : (Array.isArray(allJobsRes) ? allJobsRes : []);
        setAllJobs(jobsArray);
        console.log("Loaded jobs:", jobsArray.length, jobsArray);

        // Fetch recommended jobs based on level
        const levelLower = level.toLowerCase();
        return getJobRecommendations(levelLower);
      })
      .then((resJobs) => {
        const jobsData = resJobs?.data;
        const jobsArray = Array.isArray(jobsData) ? jobsData : (Array.isArray(resJobs) ? resJobs : []);
        setRecommendedJobs(jobsArray);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        console.error("Error details:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));

    // Cleanup: restore original overflow on unmount (optional)
    return () => {
      // Optionally restore original styles if needed
    };

    // Load unread message count
    if (studentId) {
      getUnreadCount(studentId)
        .then(res => setUnreadCount(res.data.unreadCount || 0))
        .catch(err => console.error("Error loading unread count:", err));
    }
  }, [studentId]);

  const loadMessages = async () => {
    if (!studentId) return;
    try {
      const res = await getReceivedMessages(studentId);
      setMessages(Array.isArray(res?.data) ? res.data : []);
      setUnreadCount(0); // Reset count after viewing
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const handleBuildResume = () => {
    // Create a printable resume in a new window
    const jobsToShow = recommendedJobs.length > 0 ? recommendedJobs : allJobs;
    const html = `
      <html>
        <head>
          <title>Resume - ${studentName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #222; }
            .head { display:flex; justify-content:space-between; align-items:center; }
            h1 { margin:0; font-size:28px; }
            .meta { color:#666; }
            .section { margin-top:20px; }
            .skills { display:flex; gap:8px; flex-wrap:wrap; }
            .pill { padding:6px 10px; background:#111; color:#fff; border-radius:8px; }
          </style>
        </head>
        <body>
          <div class="head">
            <div>
              <h1>${studentName}</h1>
              <div class="meta">Score: ${result.score} • Level: ${result.level}</div>
            </div>
            <div>
              <img src="" alt="avatar" style="width:64px;height:64px;border-radius:8px;background:#ddd" />
            </div>
          </div>

          <div class="section">
            <h3>Summary</h3>
            <p>Motivated candidate seeking opportunities based on SkillFit assessment. Competency level: ${result.level}.</p>
          </div>

          <div class="section">
            <h3>Recommended Roles</h3>
            <ul>
              ${jobsToShow.slice(0,5).map(j => `<li><strong>${j.role}</strong> — ${j.description || ''}</li>`).join("")}
            </ul>
          </div>

          <div class="section">
            <h3>Skills</h3>
            <div class="skills">
              <span class="pill">HTML</span><span class="pill">CSS</span><span class="pill">React</span>
            </div>
          </div>

          <script>
            window.onload = function(){ window.print(); }
          </script>
        </body>
      </html>
    `;
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked. Allow popups for this site.");
    w.document.write(html);
    w.document.close();
  };


  return (
    <div className="sf-dashboard-root">
      <Header 
        name={studentName} 
        unreadCount={unreadCount}
        onMessagesClick={() => {
          setShowMessages(!showMessages);
          if (!showMessages) loadMessages();
        }}
      />

      <main className="sf-grid">
        <div className="sf-left-col">
          <div className="sf-intro-card sf-card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ 
                width: "56px", 
                height: "56px", 
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
              }}>
                👋
              </div>
              <div style={{ flex: 1 }}>
                <h2>Welcome back, {studentName}!</h2>
                <p className="sf-tagline">Your journey to excellence continues</p>
              </div>
            </div>

            <div className="sf-actions">
              <button className="sf-btn" onClick={() => window.location.href = "/student/quiz"}>
                🚀 Take Assessment
              </button>
              <button className="sf-btn ghost" onClick={() => window.location.href = "/profile"}>
                ⚙️ Edit Profile
              </button>
            </div>
          </div>

          <PerformanceCard score={result.score} level={result.level} totalQuestions={result.totalQuestions} />

          <AllJobsList allJobs={allJobs} loading={loading} />

          <div className="sf-card" style={{
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
            border: "1px solid rgba(255,255,255,0.25)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ 
                fontSize: "32px",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                📄
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#fff" }}>Resume Builder</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                  Auto-generate a professional resume from your profile & results
                </p>
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <button className="sf-btn" onClick={handleBuildResume} style={{ width: "100%" }}>
                🚀 Build Resume PDF
              </button>
            </div>
          </div>
        </div>

        <aside className="sf-right-col">
          <Recommendations jobs={recommendedJobs} studentLevel={result.level} />
        </aside>
      </main>

      {/* Messages Modal */}
      {showMessages && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowMessages(false)}
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#fff" }}>💬 Your Messages</h3>
              <button
                className="sf-btn ghost"
                onClick={() => setShowMessages(false)}
                style={{ padding: "4px 8px", fontSize: "18px" }}
              >
                ×
              </button>
            </div>

            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
                No messages yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: "12px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div style={{ fontWeight: "700", color: "#fff" }}>
                        {msg.senderType === "recruiter" ? "📧 " : "👤 "}
                        {msg.senderName || "Unknown"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9deff0" }}>
                        {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : ""}
                      </div>
                    </div>
                    <div style={{ fontWeight: "600", color: "#9deff0", marginBottom: "6px", fontSize: "13px" }}>
                      {msg.subject}
                    </div>
                    <div style={{ color: "#bfeff0", fontSize: "13px", lineHeight: "1.5" }}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {loading && <div className="sf-loading">Loading...</div>}
    </div>
  );
}
