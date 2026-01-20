// src/components/Quiz.jsx
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchQuestions, submitAnswers } from "../api/apiService";
import "./dashboard.css";

const Quiz = ({ onFinish }) => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera and microphone
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        
        streamRef.current = stream;
        setCameraActive(true);
        setMicActive(true);
        
        // Set video source after a small delay to ensure ref is set
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }, 100);
      } catch (err) {
        console.error("Error accessing camera/microphone:", err);
        setCameraError("Camera and microphone access is required for the test. Please allow access and refresh.");
      }
    };

    if (!loading && questions.length > 0) {
      initializeMedia();
    }

    return () => {
      // Cleanup: Stop all tracks when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [loading, questions.length]);

  // Prevent copy-paste and screenshots
  useEffect(() => {
    if (loading || questions.length === 0) return;

    // Prevent copy, cut, paste
    const handleCopy = (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert("Copying is not allowed during the test.");
      return false;
    };

    const handleCut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert("Cutting is not allowed during the test.");
      return false;
    };

    const handlePaste = (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert("Pasting is not allowed during the test.");
      return false;
    };

    // Prevent right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      alert("Right-click is disabled during the test.");
      return false;
    };

    // Prevent print screen and other screenshot shortcuts
    const handleKeyDown = (e) => {
      // Disable Print Screen
      if (e.key === 'PrintScreen' || (e.key === 'F12') || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U') || (e.ctrlKey && e.key === 'S') ||
          (e.ctrlKey && e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        alert("This action is not allowed during the test.");
        return false;
      }
    };

    // Prevent drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e) => {
      // Allow selection but prevent if it seems like copying
      return true;
    };

    // Tab visibility change detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => {
          const newCount = prev + 1;
          
          if (newCount === 1) {
            alert("⚠️ Warning: Switching tabs is not allowed during the test. This is your first warning. If you switch tabs again, the test will be automatically closed.");
          } else if (newCount >= 2) {
            // Stop camera and microphone
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
            alert("❌ Test closed due to multiple tab switches. Your test has been terminated.");
            // Close the test by redirecting
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 100);
          }
          
          return newCount;
        });
      }
    };

    // Window blur detection (when user switches tabs)
    const handleBlur = () => {
      setTabSwitchCount(prev => {
        const newCount = prev + 1;
        
        if (newCount === 1) {
          alert("⚠️ Warning: Switching tabs is not allowed during the test. This is your first warning. If you switch tabs again, the test will be automatically closed.");
        } else if (newCount >= 2) {
          // Stop camera and microphone
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          alert("❌ Test closed due to multiple tab switches. Your test has been terminated.");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 100);
        }
        
        return newCount;
      });
    };

    // Add event listeners
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // Disable text selection on question text (but allow on options for selection)
    const style = document.createElement('style');
    style.textContent = `
      .quiz-question-text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.head.removeChild(style);
    };
  }, [loading, questions.length, tabSwitchCount]);

  useEffect(() => {
    // Ensure body and html allow scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    setLoading(true);
    fetchQuestions(jobId ? parseInt(jobId) : null)
      .then(res => setQuestions(res.data))
      .catch(err => {
        console.error("Error fetching questions:", err);
        alert("Error loading questions. Please try again.");
      })
      .finally(() => setLoading(false));

    return () => {
      // Cleanup if needed
    };
  }, [jobId]);

  const handleOptionChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    // Validate all questions are answered
    if (Object.keys(answers).length < questions.length) {
      const unanswered = questions.length - Object.keys(answers).length;
      if (!window.confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
        return;
      }
    }

    setSubmitting(true);
    
    // Stop camera and microphone when submitting
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      setMicActive(false);
    }
    
    try {
      // Convert answers to match backend format (questionId as string)
      const formattedAnswers = {};
      Object.keys(answers).forEach(key => {
        formattedAnswers[key.toString()] = answers[key];
      });
      
      const jobIdNum = jobId ? parseInt(jobId) : null;
      const res = await submitAnswers({ answers: formattedAnswers }, jobIdNum);

      // Store result in localStorage as backup
      const resultData = {
        ...res.data,
        totalQuestions: questions.length
      };
      localStorage.setItem('lastQuizResult', JSON.stringify(resultData));

      // pass result to parent (Result page)
      onFinish(resultData);

    } catch (err) {
      console.error(err);
      alert("Error submitting quiz: " + (err.response?.data?.error || err.message));
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="sf-dashboard-root">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Camera and Microphone Status */}
        {!loading && questions.length > 0 && (
          <div className="sf-card" style={{ marginBottom: "20px", background: "rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: cameraActive ? "#00ff00" : "#ff0000",
                  boxShadow: cameraActive ? "0 0 8px #00ff00" : "none"
                }}></div>
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  Camera: {cameraActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: micActive ? "#00ff00" : "#ff0000",
                  boxShadow: micActive ? "0 0 8px #00ff00" : "none"
                }}></div>
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  Microphone: {micActive ? "Active" : "Inactive"}
                </span>
              </div>
              {tabSwitchCount > 0 && (
                <div style={{ 
                  color: tabSwitchCount >= 2 ? "#ff4444" : "#ffaa00", 
                  fontSize: "14px",
                  fontWeight: "600"
                }}>
                  ⚠️ Tab Switch Warnings: {tabSwitchCount} / 2
                </div>
              )}
            </div>
            {cameraError && (
              <div style={{ 
                marginTop: "12px", 
                padding: "12px", 
                background: "rgba(255,0,0,0.2)", 
                borderRadius: "8px",
                color: "#ff4444",
                fontSize: "14px"
              }}>
                {cameraError}
              </div>
            )}
            {/* Video Preview */}
            {cameraActive && (
              <div style={{ marginTop: "12px", position: "relative" }}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: "150px",
                    height: "112px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "2px solid rgba(0,240,255,0.5)",
                    background: "#000"
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "4px",
                  left: "4px",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "11px"
                }}>
                  Live
                </div>
              </div>
            )}
          </div>
        )}

        <div className="sf-card" style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ margin: "0 0 8px 0", color: "#fff", fontSize: "24px" }}>📝 SkillFit Quiz</h2>
              {jobId && (
                <p style={{ margin: 0, fontSize: "13px", color: "#9deff0", opacity: 0.9 }}>
                  Job-specific assessment
                </p>
              )}
            </div>
            {questions.length > 0 && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "14px", color: "#9deff0", marginBottom: "4px" }}>
                  Progress: {answeredCount} / {questions.length}
                </div>
                <div style={{ 
                  width: "200px", 
                  height: "8px", 
                  background: "rgba(255,255,255,0.1)", 
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    width: `${progress}%`, 
                    height: "100%", 
                    background: "linear-gradient(90deg,#00f0ff,#4ad9d9)",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="sf-card" style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ color: "#9deff0", fontSize: "16px" }}>Loading questions...</div>
          </div>
        ) : questions.length === 0 ? (
          <div className="sf-card" style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ color: "#9deff0", fontSize: "16px", marginBottom: "12px" }}>
              No questions available for this test.
            </div>
            <button 
              className="sf-btn ghost" 
              onClick={() => window.location.href = "/dashboard"}
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              {questions.map((q, index) => (
                <div key={q.id} className="sf-card" style={{ 
                  background: answers[q.id] ? "rgba(0,240,255,0.05)" : "rgba(255,255,255,0.02)",
                  border: answers[q.id] ? "1px solid rgba(0,240,255,0.2)" : "1px solid rgba(255,255,255,0.03)",
                  transition: "all 0.2s"
                }}>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px", 
                      marginBottom: "12px" 
                    }}>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: answers[q.id] ? "linear-gradient(90deg,#00f0ff,#4ad9d9)" : "rgba(255,255,255,0.1)",
                        color: answers[q.id] ? "#001" : "#fff",
                        fontWeight: "700",
                        fontSize: "14px"
                      }}>
                        {index + 1}
                      </span>
                      <h3 
                        className="quiz-question-text"
                        style={{ 
                          margin: 0, 
                          color: "#fff", 
                          fontSize: "18px",
                          fontWeight: "600",
                          flex: 1
                        }}
                      >
                        {q.questionText}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {q.options.map((opt, idx) => (
                      <label
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "12px",
                          borderRadius: "8px",
                          background: answers[q.id] === opt 
                            ? "rgba(0,240,255,0.15)" 
                            : "rgba(255,255,255,0.03)",
                          border: answers[q.id] === opt
                            ? "1px solid rgba(0,240,255,0.3)"
                            : "1px solid rgba(255,255,255,0.05)",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          hover: {
                            background: "rgba(255,255,255,0.05)"
                          }
                        }}
                        onMouseEnter={(e) => {
                          if (answers[q.id] !== opt) {
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (answers[q.id] !== opt) {
                            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => handleOptionChange(q.id, opt)}
                          style={{
                            marginRight: "12px",
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                            accentColor: "#00f0ff"
                          }}
                        />
                        <span style={{ 
                          color: "#fff", 
                          fontSize: "15px",
                          flex: 1
                        }}>
                          {opt}
                        </span>
                        {answers[q.id] === opt && (
                          <span style={{ 
                            color: "#00f0ff", 
                            fontSize: "18px",
                            fontWeight: "bold"
                          }}>
                            ✓
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sf-card" style={{ 
              position: "sticky",
              bottom: "20px",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,240,255,0.2)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "14px", color: "#9deff0", marginBottom: "4px" }}>
                    {answeredCount === questions.length 
                      ? "✓ All questions answered" 
                      : `${questions.length - answeredCount} question(s) remaining`}
                  </div>
                </div>
                <button
                  className="sf-btn"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "700",
                    minWidth: "150px",
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? "not-allowed" : "pointer"
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;



