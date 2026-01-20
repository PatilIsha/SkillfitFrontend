import React, { useEffect, useState } from "react";
import { getStudentResult, getJobRecommendations, getAllJobs } from "../../api/apiService";
import "../../components/dashboard.css";

// Import components from Dashboard
function PerformanceCard({ score, level, totalQuestions = 10 }) {
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
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            Career Recommendations
          </h3>
        </div>
        <p style={{ 
          fontSize: "13px", 
          color: "#fff", 
          margin: 0,
          fontWeight: "600",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          opacity: 0.95
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
            <div className="sf-job-role" style={{ fontSize: "17px", fontWeight: "800", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)", marginBottom: "10px" }}>
              {job.role}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
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
              {job.companyName && (
                <div style={{ fontSize: "13px", color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "16px" }}>🏢</span>
                  <strong style={{ color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)", fontWeight: "700" }}>
                    {job.companyName}
                  </strong>
                </div>
              )}
            </div>
            <div className="sf-job-meta" style={{ fontSize: "13px", lineHeight: "1.6", color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: 0.9 }}>
              {job.description || "No description available"}
            </div>
          </div>
        )) : <div style={{ 
          textAlign: "center", 
          padding: "30px 20px", 
          color: "#fff",
          fontSize: "14px",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          opacity: 0.9
        }}>
          No recommendations yet — take a test to get started.
        </div>}
      </div>
    </section>
  );
}

function AllJobsList({ allJobs, loading }) {
  if (loading) {
    return (
      <section className="sf-card">
        <h3>💼 All Available Jobs</h3>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>Loading jobs...</div>
      </section>
    );
  }

  // Group jobs by company
  const jobsByCompany = allJobs.reduce((acc, job) => {
    const companyName = job.companyName || "General";
    if (!acc[companyName]) {
      acc[companyName] = [];
    }
    acc[companyName].push(job);
    return acc;
  }, {});

  return (
    <section className="sf-card">
      <h3>💼 All Available Jobs</h3>
      {allJobs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          No jobs available at the moment. Check back later!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {Object.entries(jobsByCompany).map(([companyName, jobs]) => (
            <div key={companyName} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
            <div key={job.id} style={{
              padding: "16px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", color: "#fff", fontSize: "18px", marginBottom: "8px" }}>
                    {job.role}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: job.level === "Expert" || job.level === "Advanced" 
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)"
                          : job.level === "Intermediate" 
                          ? "linear-gradient(135deg, rgba(244,180,0,0.9) 0%, rgba(255,193,7,0.9) 100%)"
                          : "linear-gradient(135deg, rgba(108,117,125,0.8) 0%, rgba(73,80,87,0.8) 100%)",
                        color: job.level === "Intermediate" ? "#000" : "#fff",
                        fontSize: "11px",
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
                  <div style={{ fontSize: "13px", lineHeight: "1.6", color: "#bfeff0", marginBottom: "12px" }}>
                    {job.description || "No description available"}
                  </div>
                </div>
              </div>
              <button
                className="sf-btn"
                onClick={() => window.location.href = `/student/quiz?jobId=${job.id}`}
                style={{
                  fontSize: "12px",
                  padding: "8px 16px",
                  marginTop: "8px",
                  alignSelf: "flex-start",
                }}
              >
                Attempt Test
              </button>
            </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  const studentId = localStorage.getItem("studentId");
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [result, setResult] = useState({ score: 0, level: "Beginner" });
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    if (!studentId) return;

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

        const jobsData = allJobsRes?.data;
        const jobsArray = Array.isArray(jobsData) ? jobsData : (Array.isArray(allJobsRes) ? allJobsRes : []);
        setAllJobs(jobsArray);

        const levelLower = level.toLowerCase();
        return getJobRecommendations(levelLower);
      })
      .then((resJobs) => {
        const jobsData = resJobs?.data;
        const jobsArray = Array.isArray(jobsData) ? jobsData : (Array.isArray(resJobs) ? resJobs : []);
        setRecommendedJobs(jobsArray);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  const handleBuildResume = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${studentName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #333; }
            .section { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${studentName}</h1>
          <div class="section">
            <h2>Assessment Score: ${result.score}/${result.totalQuestions || 10}</h2>
            <p>Level: ${result.level}</p>
          </div>
        </body>
      </html>
    `;
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked. Allow popups for this site.");
    w.document.write(html);
    w.document.close();
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ 
          margin: "0 0 8px 0", 
          fontSize: "32px", 
          fontWeight: "800", 
          color: "#fff",
          textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)"
        }}>
          Welcome back, {studentName}!
        </h1>
        <p style={{ 
          margin: 0, 
          fontSize: "16px", 
          color: "#fff",
          fontWeight: "600",
          textShadow: "0 1px 6px rgba(0,0,0,0.3)",
          opacity: 0.95
        }}>
          Your journey to excellence continues
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button 
          className="sf-btn" 
          onClick={() => window.location.href = "/student/quiz"}
          style={{ padding: "12px 24px" }}
        >
          🚀 Take Assessment
        </button>
        <button 
          className="sf-btn ghost" 
          onClick={() => window.location.href = "/student/profile"}
          style={{ padding: "12px 24px" }}
        >
          ⚙️ Edit Profile
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <PerformanceCard score={result.score} level={result.level} totalQuestions={result.totalQuestions} />
          <AllJobsList allJobs={allJobs} loading={loading} />

          <div className="sf-card" style={{
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
            border: "1px solid rgba(255,255,255,0.25)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "32px" }}>📄</div>
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

        <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Recommendations jobs={recommendedJobs} studentLevel={result.level} />
        </aside>
      </div>
    </div>
  );
}

