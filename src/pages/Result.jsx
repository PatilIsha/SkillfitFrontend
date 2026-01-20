import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../components/dashboard.css";

export default function Result({ result: propResult }) {
  const location = useLocation();
  const [result, setResult] = useState(propResult);
  const [loading, setLoading] = useState(!propResult);

  useEffect(() => {
    // Ensure body and html allow scrolling
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';

    // Try to get result from location state if not in props
    if (!result && location.state?.result) {
      setResult(location.state.result);
      setLoading(false);
    } else if (!result) {
      // If no result, try to get from localStorage or redirect
      const savedResult = localStorage.getItem('lastQuizResult');
      if (savedResult) {
        try {
          setResult(JSON.parse(savedResult));
        } catch (e) {
          console.error("Error parsing saved result:", e);
        }
      }
      setLoading(false);
    }

    return () => {
      // Cleanup if needed
    };
  }, [result, location.state]);

  if (loading) {
    return (
      <div className="sf-dashboard-root">
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "40px" }}>
          <div className="sf-card">
            <div style={{ color: "#9deff0", fontSize: "16px" }}>Loading results...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="sf-dashboard-root">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="sf-card" style={{ textAlign: "center", padding: "40px" }}>
            <h2 style={{ color: "#fff", marginBottom: "16px" }}>No Results Found</h2>
            <p style={{ color: "#9deff0", marginBottom: "24px" }}>
              We couldn't find your quiz results. Please take the quiz again.
            </p>
            <button className="sf-btn" onClick={() => window.location.href = "/quiz"}>
              Take Quiz Again
            </button>
            <button 
              className="sf-btn ghost" 
              onClick={() => window.location.href = "/dashboard"}
              style={{ marginLeft: "12px" }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const score = result.score ?? 0;
  const level = result.level || "Beginner";
  const totalQuestions = result.totalQuestions || 10; // Default if not provided
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // Determine level color and emoji
  const getLevelInfo = (level) => {
    const levelLower = level?.toLowerCase() || "beginner";
    if (levelLower === "expert" || levelLower === "advanced") {
      return { color: "#00f0ff", bg: "rgba(0,240,255,0.15)", emoji: "🌟", label: "Expert" };
    } else if (levelLower === "intermediate") {
      return { color: "#f4b400", bg: "rgba(244,180,0,0.15)", emoji: "⭐", label: "Intermediate" };
    } else {
      return { color: "#6c757d", bg: "rgba(108,117,125,0.15)", emoji: "📚", label: "Beginner" };
    }
  };

  const levelInfo = getLevelInfo(level);

  return (
    <div className="sf-dashboard-root">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div className="sf-card" style={{ marginBottom: "20px", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 8px 0", color: "#fff", fontSize: "28px" }}>
            🎉 Quiz Results
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#9deff0", opacity: 0.9 }}>
            Great job completing the assessment!
          </p>
        </div>

        {/* Score Card */}
        <div className="sf-card" style={{ marginBottom: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ 
              fontSize: "72px", 
              fontWeight: "800", 
              color: "#fff",
              marginBottom: "8px",
              textShadow: "0 4px 20px rgba(0,240,255,0.3)"
            }}>
              {score}
            </div>
            <div style={{ fontSize: "18px", color: "#9deff0", marginBottom: "4px" }}>
              Marks: {score} / {totalQuestions}
            </div>
            <div style={{ 
              fontSize: "24px", 
              fontWeight: "700", 
              color: "#00f0ff",
              marginTop: "8px"
            }}>
              Percentage: {percentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ 
            width: "100%", 
            height: "12px", 
            background: "rgba(255,255,255,0.1)", 
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "24px"
          }}>
            <div style={{ 
              width: `${percentage}%`, 
              height: "100%", 
              background: "linear-gradient(90deg,#00f0ff,#4ad9d9)",
              transition: "width 0.5s ease",
              borderRadius: "6px"
            }}></div>
          </div>

          {/* Level Badge */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            background: levelInfo.bg,
            borderRadius: "12px",
            border: `2px solid ${levelInfo.color}`
          }}>
            <span style={{ fontSize: "32px" }}>{levelInfo.emoji}</span>
            <div>
              <div style={{ fontSize: "12px", color: "#9deff0", marginBottom: "4px" }}>
                Your Competency Level
              </div>
              <div style={{ 
                fontSize: "24px", 
                fontWeight: "700", 
                color: levelInfo.color 
              }}>
                {levelInfo.label}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="sf-card" style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#fff", marginBottom: "16px", fontSize: "18px" }}>
            📊 Performance Summary
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px"
            }}>
              <span style={{ color: "#9deff0", fontSize: "14px" }}>Marks</span>
              <span style={{ color: "#00f0ff", fontSize: "16px", fontWeight: "700" }}>
                {score} / {totalQuestions}
              </span>
            </div>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px"
            }}>
              <span style={{ color: "#9deff0", fontSize: "14px" }}>Percentage</span>
              <span style={{ color: "#00f0ff", fontSize: "16px", fontWeight: "700" }}>
                {percentage}%
              </span>
            </div>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px"
            }}>
              <span style={{ color: "#9deff0", fontSize: "14px" }}>Level Achieved</span>
              <span style={{ 
                color: levelInfo.color, 
                fontSize: "16px", 
                fontWeight: "700",
                padding: "4px 12px",
                background: levelInfo.bg,
                borderRadius: "6px"
              }}>
                {levelInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Wrong Questions Review */}
        {result.questionDetails && result.questionDetails.length > 0 && (
          <div className="sf-card" style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", marginBottom: "16px", fontSize: "18px" }}>
              📝 Question Review
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {result.questionDetails
                .filter(q => !q.isCorrect)
                .map((q, index) => (
                  <div 
                    key={q.questionId || index}
                    style={{
                      padding: "16px",
                      background: "rgba(255,0,0,0.1)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,100,100,0.3)"
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "8px",
                      marginBottom: "12px"
                    }}>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(255,100,100,0.3)",
                        color: "#ff6b6b",
                        fontWeight: "700",
                        fontSize: "14px"
                      }}>
                        ✗
                      </span>
                      <h4 style={{ 
                        margin: 0, 
                        color: "#fff", 
                        fontSize: "16px",
                        fontWeight: "600"
                      }}>
                        Question {index + 1}
                      </h4>
                    </div>
                    <div style={{ 
                      color: "#fff", 
                      fontSize: "15px",
                      marginBottom: "12px",
                      lineHeight: "1.5"
                    }}>
                      {q.questionText}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{
                        padding: "8px 12px",
                        background: "rgba(255,100,100,0.2)",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,100,100,0.4)"
                      }}>
                        <div style={{ fontSize: "12px", color: "#ffaaaa", marginBottom: "4px" }}>
                          Your Answer:
                        </div>
                        <div style={{ color: "#ff6b6b", fontSize: "14px", fontWeight: "600" }}>
                          {q.userAnswer}
                        </div>
                      </div>
                      <div style={{
                        padding: "8px 12px",
                        background: "rgba(0,255,100,0.2)",
                        borderRadius: "6px",
                        border: "1px solid rgba(0,255,100,0.4)"
                      }}>
                        <div style={{ fontSize: "12px", color: "#aaffaa", marginBottom: "4px" }}>
                          Correct Answer:
                        </div>
                        <div style={{ color: "#00ff88", fontSize: "14px", fontWeight: "600" }}>
                          {q.correctAnswer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {result.questionDetails.filter(q => !q.isCorrect).length === 0 && (
                <div style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#00ff88",
                  fontSize: "16px",
                  fontWeight: "600"
                }}>
                  🎉 Perfect! You got all questions correct!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="sf-card" style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "18px" }}>
            🎯 What's Next?
          </h3>
          <p style={{ color: "#9deff0", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
            {percentage >= 75 
              ? "Excellent work! You've demonstrated strong knowledge. Consider exploring more advanced topics or applying for expert-level positions."
              : percentage >= 50
              ? "Good progress! You're on the right track. Keep practicing and reviewing the topics to improve your score."
              : "Don't worry! Every expert was once a beginner. Review the material and try again to improve your score."}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button 
            className="sf-btn" 
            onClick={() => window.location.href = "/student/dashboard"}
            style={{ padding: "12px 24px", fontSize: "16px" }}
          >
            🏠 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
