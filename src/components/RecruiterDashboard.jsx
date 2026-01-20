import React, { useState, useEffect } from "react";
import {
  getAllJobs,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob,
  getAllStudents,
  getStudentDetails,
  sendMessage,
  createQuestion,
  getQuestionsWithAnswers,
  updateQuestion,
  deleteQuestion,
  getRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterMessages,
} from "../api/apiService";
import "./dashboard.css";

function Sidebar({ activeTab, setActiveTab, onLogout, name }) {
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
          <div style={{ fontSize: "11px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Recruiter</div>
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
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "jobs", label: "Jobs", icon: "💼" },
            { id: "candidates", label: "Candidates", icon: "👥" },
            { id: "tests", label: "Tests", icon: "📝" },
            { id: "messages", label: "Messages", icon: "💬" },
            { id: "profile", label: "Profile", icon: "👤" },
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
              <span>{item.label}</span>
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
            { id: "settings", label: "Settings", icon: "⚙️" },
            { id: "help", label: "Help", icon: "❓" },
          ].map((item) => (
            <button
              key={item.id}
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
            onClick={onLogout}
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
            {name?.charAt(0)?.toUpperCase() || "R"}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{name}</div>
            <div style={{ fontSize: "11px", color: "#fff", fontWeight: "500", textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: 0.95 }}>Recruiter</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
          placeholder="🔍 Search candidates, jobs..."
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
          <div className="sf-avatar">{name?.charAt(0)?.toUpperCase() || "R"}</div>
          <div className="sf-name" style={{ fontSize: "13px" }}>{name}</div>
        </div>
      </div>
    </div>
  );
}

function TestManagement({ onRefresh, loading, jobs = [], recruiterId }) {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    jobId: "", // Optional: link to a specific job
  });

  useEffect(() => {
    loadQuestions();
  }, [recruiterId]);

  const loadQuestions = async () => {
    try {
      const recruiterIdNum = recruiterId ? (typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId) : null;
      const res = await getQuestionsWithAnswers(recruiterIdNum);
      setQuestions(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading questions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form
      if (!formData.questionText.trim()) {
        alert("Please enter a question");
        return;
      }
      if (formData.options.filter(opt => opt.trim()).length < 2) {
        alert("Please provide at least 2 options");
        return;
      }
      if (!formData.correctAnswer.trim()) {
        alert("Please select the correct answer");
        return;
      }

      const recruiterIdNum = recruiterId ? (typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId) : null;
      const questionData = {
        questionText: formData.questionText,
        options: formData.options.filter(opt => opt.trim()),
        correctAnswer: formData.correctAnswer,
        jobId: formData.jobId ? parseInt(formData.jobId) : null, // Include jobId if selected
        recruiterId: recruiterIdNum, // Include recruiterId
      };

      if (editingQuestion) {
        // Update existing question
        await updateQuestion(editingQuestion.id, questionData);
        alert("Question updated successfully!");
        setEditingQuestion(null);
      } else {
        // Create new question
        await createQuestion(questionData);
        alert("Question created successfully!");
      }
      
      setShowForm(false);
      setFormData({ questionText: "", options: ["", "", "", ""], correctAnswer: "", jobId: "" });
      loadQuestions();
    } catch (err) {
      console.error("Error saving question:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    // Ensure we have at least 4 option slots, pad with empty strings if needed
    const questionOptions = question.options || [];
    const paddedOptions = [...questionOptions];
    while (paddedOptions.length < 4) {
      paddedOptions.push("");
    }
    
    setFormData({
      questionText: question.questionText || "",
      options: paddedOptions,
      correctAnswer: question.correctAnswer || "",
      jobId: question.jobId ? question.jobId.toString() : "",
    });
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteQuestion(questionId);
      alert("Question deleted successfully!");
      loadQuestions();
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingQuestion(null);
    setFormData({ questionText: "", options: ["", "", "", ""], correctAnswer: "", jobId: "" });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleAddOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const handleRemoveOption = (index) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <section className="sf-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3>📝 Test Management</h3>
        <button className="sf-btn" onClick={() => {
          if (showForm) {
            handleCancel();
          } else {
            setShowForm(true);
            setEditingQuestion(null);
          }
        }}>
          {showForm ? "Cancel" : "+ Create Question"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "16px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
          {editingQuestion && (
            <div style={{ 
              marginBottom: "12px", 
              padding: "10px", 
              background: "rgba(0,240,255,0.1)", 
              borderRadius: "6px",
              border: "1px solid rgba(0,240,255,0.3)"
            }}>
              <div style={{ color: "#00f0ff", fontSize: "14px", fontWeight: "600" }}>
                ✏️ Editing Question #{editingQuestion.id}
              </div>
            </div>
          )}
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Question Text *
            </label>
            <textarea
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
                resize: "vertical",
              }}
              placeholder="Enter your question here..."
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Options *
            </label>
            {formData.options.map((option, index) => (
              <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0,0,0,0.2)",
                    color: "#fff",
                  }}
                  placeholder={`Option ${index + 1}`}
                />
                {formData.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    style={{
                      padding: "8px 12px",
                      background: "#ff6b6b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="sf-btn ghost"
              style={{ fontSize: "12px", padding: "6px 12px" }}
            >
              + Add Option
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Link to Job (Optional)
            </label>
            <select
              value={formData.jobId}
              onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
              }}
            >
              <option value="">General Test (Not linked to any job)</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.role} ({job.level})
                </option>
              ))}
            </select>
            <p style={{ fontSize: "11px", color: "#fff", opacity: 0.9, marginTop: "4px", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              Select a job to link this question to, or leave as "General Test" for all jobs
            </p>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Correct Answer *
            </label>
            <select
              value={formData.correctAnswer}
              onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
              }}
            >
              <option value="">Select correct answer</option>
              {formData.options.filter(opt => opt.trim()).map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" className="sf-btn">
              {editingQuestion ? "Update Question" : "Create Question"}
            </button>
            <button type="button" className="sf-btn ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ marginTop: "16px" }}>
        <h4 style={{ marginBottom: "12px", color: "#fff" }}>Existing Questions ({questions.length})</h4>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Loading questions...</div>
        ) : questions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
            No questions created yet. Create your first question above!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {questions.map((q) => (
              <div
                key={q.id}
                style={{
                  padding: "16px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", color: "#fff", flex: 1, fontSize: "15px" }}>
                    {q.questionText}
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginLeft: "12px" }}>
                    {q.jobId && (
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          background: "rgba(0,240,255,0.2)",
                          color: "#00f0ff",
                          fontSize: "11px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {jobs.find(j => j.id === q.jobId)?.role || `Job #${q.jobId}`}
                      </span>
                    )}
                    {!q.jobId && (
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.1)",
                          color: "#fff",
                          fontSize: "11px",
                          fontWeight: "600",
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        General
                      </span>
                    )}
                    <button
                      onClick={() => handleEdit(q)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(0,240,255,0.3)",
                        background: "rgba(0,240,255,0.1)",
                        color: "#00f0ff",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(0,240,255,0.2)";
                        e.target.style.borderColor = "rgba(0,240,255,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(0,240,255,0.1)";
                        e.target.style.borderColor = "rgba(0,240,255,0.3)";
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,100,100,0.3)",
                        background: "rgba(255,100,100,0.1)",
                        color: "#ff6b6b",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(255,100,100,0.2)";
                        e.target.style.borderColor = "rgba(255,100,100,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255,100,100,0.1)";
                        e.target.style.borderColor = "rgba(255,100,100,0.3)";
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#fff", fontSize: "12px", fontWeight: "700", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Options:</strong>
                  <ul style={{ margin: "4px 0", paddingLeft: "20px", color: "#fff", fontSize: "13px", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                    {q.options?.map((opt, idx) => (
                      <li key={idx} style={{ color: opt === q.correctAnswer ? "#00f0ff" : "#fff", textShadow: opt === q.correctAnswer ? "0 1px 4px rgba(0,240,255,0.5)" : "0 1px 3px rgba(0,0,0,0.3)", fontWeight: opt === q.correctAnswer ? "700" : "500" }}>
                        {opt} {opt === q.correctAnswer && "✓ (Correct)"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function JobManagement({ jobs, onRefresh, loading, recruiterId }) {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ role: "", level: "Beginner", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      
      const recruiterIdNum = recruiterId ? (typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId) : null;
      const jobData = { ...formData };
      if (recruiterIdNum) {
        jobData.recruiterId = recruiterIdNum;
      }
      
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        alert("Job updated successfully!");
      } else {
        const response = await createJob(jobData);
        console.log("Job created response:", response);
        alert("Job created successfully!");
      }
      setShowForm(false);
      setEditingJob(null);
      setFormData({ role: "", level: "Beginner", description: "" });
      onRefresh();
    } catch (err) {
      console.error("Error creating/updating job:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      
      // Try to get detailed error message
      const errorData = err.response?.data || {};
      const errorMessage = errorData.message || 
                          errorData.error || 
                          errorData.details ||
                          err.message || 
                          "Unknown error occurred";
      
      // Show full error details in console
      console.error("Full error details:", JSON.stringify(errorData, null, 2));
      
      alert(`Error: ${errorMessage}\n\nCheck browser console (F12) for full details.`);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      role: job.role || "",
      level: job.level || "Beginner",
      description: job.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      alert("Job deleted successfully!");
      onRefresh();
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingJob(null);
    setFormData({ role: "", level: "Beginner", description: "" });
  };

  return (
    <section className="sf-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3>💼 Job Management</h3>
        <button className="sf-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Job"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "16px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Job Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
              }}
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#fff",
                resize: "vertical",
              }}
              placeholder="Job description..."
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" className="sf-btn">
              {editingJob ? "Update Job" : "Create Job"}
            </button>
            {editingJob && (
              <button type="button" className="sf-btn ghost" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="sf-job-list">
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>No jobs yet. Create your first job!</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="sf-job-item" style={{ position: "relative" }}>
              <div style={{ flex: 1 }}>
                <div className="sf-job-role">{job.role}</div>
                <div className="sf-job-meta">
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: job.level === "Expert" ? "#00f0ff" : job.level === "Intermediate" ? "#f4b400" : "#6c757d",
                      color: job.level === "Intermediate" ? "#111" : "#fff",
                      fontSize: "11px",
                      fontWeight: "600",
                      marginRight: "8px",
                    }}
                  >
                    {job.level}
                  </span>
                  {job.description?.slice(0, 100)}
                  {job.description && job.description.length > 100 ? "…" : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                <button
                  className="sf-btn ghost"
                  onClick={() => handleEdit(job)}
                  style={{ fontSize: "12px", padding: "4px 8px" }}
                >
                  Edit
                </button>
                <button
                  className="sf-btn ghost"
                  onClick={() => handleDelete(job.id)}
                  style={{ fontSize: "12px", padding: "4px 8px", color: "#ff6b6b" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function StudentsList({ students, loading, onViewDetails, recruiterId }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageStudent, setMessageStudent] = useState(null);
  const [messageForm, setMessageForm] = useState({ subject: "", message: "" });

  const handleViewDetails = async (studentId) => {
    if (selectedStudent === studentId && studentDetails) {
      setSelectedStudent(null);
      setStudentDetails(null);
      return;
    }
    setSelectedStudent(studentId);
    setLoadingDetails(true);
    try {
      const recruiterIdNum = recruiterId ? (typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId) : null;
      const res = await getStudentDetails(studentId, recruiterIdNum);
      setStudentDetails(res.data);
    } catch (err) {
      alert("Error loading student details: " + err.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <section className="sf-card">
      <h3>👥 Candidates & Assessments</h3>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Loading students...</div>
      ) : students.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>No students registered yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {students.map((student) => (
            <div key={student.id} style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "700", color: "#fff", marginBottom: "4px" }}>{student.name}</div>
                  <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", textShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.95 }}>{student.email}</div>
                  <div style={{ display: "flex", gap: "12px", fontSize: "12px" }}>
                    <span style={{ color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                      Score: <strong style={{ color: "#fff" }}>{student.score || 0}</strong>
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background:
                          student.level === "Expert" || student.level === "Advanced"
                            ? "#00f0ff"
                            : student.level === "Intermediate"
                            ? "#f4b400"
                            : "#6c757d",
                        color: student.level === "Intermediate" ? "#111" : "#fff",
                        fontSize: "11px",
                        fontWeight: "600",
                      }}
                    >
                      {student.level || "No test"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    className="sf-btn"
                    onClick={() => {
                      setMessageStudent(student);
                      setMessageForm({ subject: `Job Opportunity for ${student.name}`, message: "" });
                      setShowMessageModal(true);
                    }}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    💬 Message
                  </button>
                  <button
                    className="sf-btn ghost"
                    onClick={() => handleViewDetails(student.id)}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    {selectedStudent === student.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {selectedStudent === student.id && (
                <div style={{ marginTop: "12px", padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                  {loadingDetails ? (
                    <div style={{ textAlign: "center", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Loading...</div>
                  ) : studentDetails ? (
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff", marginBottom: "8px", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                        Assessment History:
                      </div>
                      {studentDetails.results && studentDetails.results.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {studentDetails.results.map((result, idx) => (
                            <div
                              key={result.id}
                              style={{
                                padding: "8px",
                                background: "rgba(255,255,255,0.03)",
                                borderRadius: "6px",
                                fontSize: "12px",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#fff" }}>
                                  Test #{idx + 1}: <strong>{result.score}/{result.totalQuestions || 10}</strong> - {result.level}
                                </span>
                                <span style={{ color: "#fff", fontSize: "11px", textShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                                  {result.takenAt
                                    ? new Date(result.takenAt).toLocaleDateString()
                                    : "Date not available"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ color: "#fff", fontSize: "12px", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>No assessment history available.</div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && messageStudent && (
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
          onClick={() => setShowMessageModal(false)}
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "500px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#fff" }}>💬 Message {messageStudent.name}</h3>
              <button
                className="sf-btn ghost"
                onClick={() => setShowMessageModal(false)}
                style={{ padding: "4px 8px", fontSize: "18px" }}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await sendMessage({
                    recruiterId: recruiterId,
                    studentId: messageStudent.id,
                    subject: messageForm.subject,
                    message: messageForm.message,
                  });
                  alert("Message sent successfully!");
                  setShowMessageModal(false);
                  setMessageForm({ subject: "", message: "" });
                } catch (err) {
                  alert("Error sending message: " + (err.response?.data?.error || err.message));
                }
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0,0,0,0.2)",
                    color: "#fff",
                  }}
                  placeholder="e.g., Job Opportunity"
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                  Message
                </label>
                <textarea
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  required
                  rows="6"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0,0,0,0.2)",
                    color: "#fff",
                    resize: "vertical",
                  }}
                  placeholder="Write your message to the candidate..."
                />
              </div>

              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="sf-btn ghost"
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="sf-btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function ProfileManagement({ recruiterId, onUpdate }) {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [recruiterId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await getRecruiterProfile(recruiterId);
      if (res.data && res.data.id) {
        setProfile({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          company: res.data.company || "",
          role: res.data.role || "",
          location: res.data.location || ""
        });
        setFormData({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          company: res.data.company || "",
          role: res.data.role || "",
          location: res.data.location || "",
          password: "", 
          confirmPassword: "" 
        });
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      alert("Error loading profile: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        role: formData.role.trim(),
        location: formData.location.trim(),
      };
      
      if (formData.password && formData.password.trim()) {
        updateData.password = formData.password.trim();
      }

      const res = await updateRecruiterProfile(recruiterId, updateData);
      
      if (res.data && res.data.id) {
        setProfile({ 
          name: res.data.name || "", 
          email: res.data.email || "",
          company: res.data.company || "",
          role: res.data.role || "",
          location: res.data.location || ""
        });
        localStorage.setItem("recruiterName", res.data.name);
        setFormData({ ...formData, password: "", confirmPassword: "" });
        setIsEditing(false);
        alert("Profile updated successfully!");
        if (onUpdate) onUpdate(res.data.name);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="sf-card">
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          👤 Profile
        </h3>
        <div style={{ textAlign: "center", padding: "40px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
          Loading profile...
        </div>
      </section>
    );
  }

  return (
    <section className="sf-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          👤 Profile Information
        </h3>
        {!isEditing && (
          <button
            className="sf-btn"
            onClick={() => setIsEditing(true)}
            style={{ padding: "8px 16px", fontSize: "13px" }}
          >
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
                Company Name
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.company || "Not set"}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Role
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.role || "Not set"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#fff", marginBottom: "6px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                Location
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {profile.location || "Not set"}
              </div>
            </div>
          </div>

          <div style={{
            padding: "16px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ fontSize: "13px", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.9, lineHeight: "1.6" }}>
              <strong>💡 Tip:</strong> Click "Edit Profile" to update your information or change your password.
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
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
                fontSize: "14px",
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
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
                fontSize: "14px",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "14px",
              }}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              <option value="">Select Role</option>
              <option value="HR">HR</option>
              <option value="CEO">CEO</option>
              <option value="COO">COO</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "14px",
              }}
              placeholder="Enter location (e.g., New York, USA)"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
              New Password (Optional)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "14px",
              }}
              placeholder="Leave blank to keep current password"
            />
          </div>

          {formData.password && (
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", color: "#fff", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                Confirm New Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required={!!formData.password}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "14px",
                }}
                placeholder="Confirm new password"
              />
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              className="sf-btn"
              disabled={saving}
              style={{ flex: 1, padding: "12px 20px" }}
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>
            <button
              type="button"
              className="sf-btn ghost"
              onClick={() => {
                setIsEditing(false);
                setFormData({ 
                  name: profile.name, 
                  email: profile.email,
                  company: profile.company,
                  role: profile.role,
                  location: profile.location,
                  password: "", 
                  confirmPassword: "" 
                });
              }}
              style={{ flex: 1, padding: "12px 20px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

// Recruiter Messages Component
function RecruiterMessages({ recruiterId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (recruiterId) {
      loadMessages();
    }
  }, [recruiterId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const id = typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId;
      const res = await getRecruiterMessages(id);
      if (res.data) {
        setMessages(Array.isArray(res.data) ? res.data : []);
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
      <section className="sf-card">
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          💬 Messages Sent
        </h3>
        <div style={{ textAlign: "center", padding: "40px", color: "#9deff0" }}>
          Loading messages...
        </div>
      </section>
    );
  }

  return (
    <section className="sf-card">
      <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
        💬 Messages Sent to Candidates
      </h3>
      {messages.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#9deff0",
          fontSize: "16px"
        }}>
          No messages sent yet. Start contacting candidates to see your messages here!
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
                    To: <strong>{message.studentName || "Student"}</strong>
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
                  Sent
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
    </section>
  );
}

function StatsCard({ title, value, icon }) {
  return (
    <div className="sf-card" style={{ 
      textAlign: "center",
      padding: "20px",
      background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "16px",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>
      <div style={{ fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "8px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{value}</div>
      <div style={{ fontSize: "14px", color: "#fff", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)", opacity: 0.95 }}>{title}</div>
    </div>
  );
}

export default function RecruiterDashboard() {
  const name = localStorage.getItem("recruiterName");
  const recruiterId = localStorage.getItem("recruiterId");
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "jobs", "candidates", or "tests"

  useEffect(() => {
    // Ensure body and html allow scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    if (!recruiterId || !name) {
      window.location.href = "/auth?type=recruiter";
      return;
    }
    loadData();

    // Cleanup: restore original overflow on unmount (optional)
    return () => {
      // Optionally restore original styles if needed
    };
  }, [recruiterId, name]);

  const loadData = async () => {
    setLoading(true);
    try {
      const recruiterIdNum = recruiterId ? (typeof recruiterId === 'string' ? parseInt(recruiterId) : recruiterId) : null;
      const [jobsRes, studentsRes] = await Promise.all([
        recruiterIdNum ? getJobsByRecruiter(recruiterIdNum) : getAllJobs(),
        getAllStudents(recruiterIdNum)
      ]);
      // Handle both direct array and wrapped response
      const jobsData = jobsRes?.data;
      const jobsArray = Array.isArray(jobsData) ? jobsData : (Array.isArray(jobsRes) ? jobsRes : []);
      setJobs(jobsArray);
      
      const studentsData = studentsRes?.data;
      const studentsArray = Array.isArray(studentsData) ? studentsData : (Array.isArray(studentsRes) ? studentsRes : []);
      setStudents(studentsArray);
    } catch (err) {
      console.error("Error loading data:", err);
      alert("Error loading data. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("recruiterId");
    localStorage.removeItem("recruiterName");
    window.location.href = "/auth?type=recruiter";
  };

  const stats = {
    totalJobs: jobs.length,
    totalStudents: students.length,
    studentsWithTests: students.filter((s) => s.score > 0 || s.level !== "No test taken").length,
  };

  return (
    <div className="sf-dashboard-root" style={{ padding: 0, display: "flex", margin: 0, overflow: "hidden" }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        name={name}
      />

      <main style={{ 
        marginLeft: "280px", 
        flex: 1, 
        padding: "24px 32px",
        minHeight: "100vh",
        width: "calc(100% - 280px)",
        boxSizing: "border-box"
      }}>
        {/* Top Bar */}
        <TopBar name={name} onRefresh={loadData} />

        {/* Dashboard Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "32px", 
            fontWeight: "800", 
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)"
          }}>
            Dashboard
          </h1>
          <p style={{ 
            margin: 0, 
            fontSize: "16px", 
            color: "#fff",
            fontWeight: "600",
            textShadow: "0 1px 6px rgba(0,0,0,0.3)",
            opacity: 0.95
          }}>
            Manage jobs, candidates, and assessments efficiently
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <button 
            className="sf-btn" 
            onClick={() => setActiveTab("jobs")}
            style={{ padding: "12px 24px" }}
          >
            ➕ Add Job
          </button>
          <button 
            className="sf-btn ghost" 
            onClick={() => setActiveTab("tests")}
            style={{ padding: "12px 24px" }}
          >
            ➕ Add Question
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "20px", 
          marginBottom: "32px" 
        }}>
          <StatsCard title="Total Jobs" value={stats.totalJobs} icon="💼" />
          <StatsCard title="Total Candidates" value={stats.totalStudents} icon="👥" />
          <StatsCard title="Tested Candidates" value={stats.studentsWithTests} icon="📊" />
          <StatsCard 
            title="Active Tests" 
            value={jobs.length > 0 ? jobs.filter(j => j).length : 0} 
            icon="📝" 
          />
        </div>

        {/* Main Content Area */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
          {/* Left Column - Main Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {activeTab === "jobs" ? (
              <JobManagement jobs={jobs} onRefresh={loadData} loading={loading} recruiterId={recruiterId} />
            ) : activeTab === "candidates" || activeTab === "students" ? (
              <StudentsList students={students} loading={loading} recruiterId={recruiterId} />
            ) : activeTab === "tests" ? (
              <TestManagement onRefresh={loadData} loading={loading} jobs={jobs} recruiterId={recruiterId} />
            ) : activeTab === "messages" ? (
              <RecruiterMessages recruiterId={recruiterId} />
            ) : activeTab === "profile" ? (
              <ProfileManagement recruiterId={recruiterId} onUpdate={(newName) => {
                if (newName) {
                  localStorage.setItem("recruiterName", newName);
                  window.location.reload();
                }
              }} />
            ) : (
              <div>
                {/* Dashboard Overview */}
                <div className="sf-card" style={{ marginBottom: "24px" }}>
                  <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    📊 Overview
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                      <div style={{ fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                        Recent Activity
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                        {stats.totalJobs + stats.totalStudents}
                      </div>
                      <div style={{ fontSize: "12px", color: "#fff", fontWeight: "500", textShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                        Total items managed
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", color: "#fff", marginBottom: "8px", fontWeight: "600", textShadow: "0 1px 4px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                        Success Rate
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                        {stats.totalStudents > 0 
                          ? Math.round((stats.studentsWithTests / stats.totalStudents) * 100) 
                          : 0}%
                      </div>
                      <div style={{ fontSize: "12px", color: "#fff", fontWeight: "500", textShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                        Candidates tested
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Access */}
                <div className="sf-card">
                  <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    🚀 Quick Access
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                    <button 
                      className="sf-btn ghost" 
                      onClick={() => setActiveTab("jobs")}
                      style={{ padding: "16px", textAlign: "left", justifyContent: "flex-start" }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>💼</div>
                      <div style={{ fontWeight: "700", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>Manage Jobs</div>
                      <div style={{ fontSize: "12px", color: "#fff", opacity: 0.95, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>Create and edit job postings</div>
                    </button>
                    <button 
                      className="sf-btn ghost" 
                      onClick={() => setActiveTab("candidates")}
                      style={{ padding: "16px", textAlign: "left", justifyContent: "flex-start" }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>👥</div>
                      <div style={{ fontWeight: "700", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>View Candidates</div>
                      <div style={{ fontSize: "12px", color: "#fff", opacity: 0.95, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>Browse and contact candidates</div>
                    </button>
                    <button 
                      className="sf-btn ghost" 
                      onClick={() => setActiveTab("tests")}
                      style={{ padding: "16px", textAlign: "left", justifyContent: "flex-start" }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>📝</div>
                      <div style={{ fontWeight: "700", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>Manage Tests</div>
                      <div style={{ fontSize: "12px", color: "#fff", opacity: 0.95, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>Create quiz questions</div>
                    </button>
                    <button 
                      className="sf-btn ghost" 
                      onClick={loadData}
                      style={{ padding: "16px", textAlign: "left", justifyContent: "flex-start" }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔄</div>
                      <div style={{ fontWeight: "700", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>Refresh Data</div>
                      <div style={{ fontSize: "12px", color: "#fff", opacity: 0.95, textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>Reload all data</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar Info */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="sf-card">
              <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                📋 Quick Stats
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ 
                  padding: "12px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ fontSize: "12px", color: "#fff", marginBottom: "4px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                    Jobs Created
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
                    {stats.totalJobs}
                  </div>
                </div>
                <div style={{ 
                  padding: "12px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ fontSize: "12px", color: "#fff", marginBottom: "4px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                    Total Candidates
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
                    {stats.totalStudents}
                  </div>
                </div>
                <div style={{ 
                  padding: "12px", 
                  background: "rgba(255,255,255,0.05)", 
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  <div style={{ fontSize: "12px", color: "#fff", marginBottom: "4px", fontWeight: "600", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                    Test Completion Rate
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
                    {stats.totalStudents > 0 
                      ? Math.round((stats.studentsWithTests / stats.totalStudents) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
            </div>

            <div className="sf-card">
              <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "800", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                ℹ️ Dashboard Guide
              </h3>
              <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.8", textShadow: "0 1px 3px rgba(0,0,0,0.3)", opacity: 0.95 }}>
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>💼 Jobs:</strong> Create and manage job postings
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>👥 Candidates:</strong> View and contact candidates
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>📝 Tests:</strong> Create job-specific quiz questions
                </div>
                <div>
                  <strong style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>📊 Dashboard:</strong> Overview of all activities
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      {loading && <div className="sf-loading">Loading...</div>}
    </div>
  );
}
