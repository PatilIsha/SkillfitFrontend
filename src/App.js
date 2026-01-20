import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UnifiedAuth from "./pages/UnifiedAuth";
import Quiz from "./components/Quiz";
import Result from "./pages/Result";
import StudentWebsite from "./components/StudentWebsite";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import RecruiterDashboard from "./components/RecruiterDashboard";

function App() {
  const [quizResult, setQuizResult] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Unified Authentication (Student & Recruiter) */}
        <Route path="/auth" element={<UnifiedAuth />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentWebsite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/jobs"
          element={
            <ProtectedRoute>
              <StudentWebsite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assessments"
          element={
            <ProtectedRoute>
              <StudentWebsite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/messages"
          element={
            <ProtectedRoute>
              <StudentWebsite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <StudentWebsite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quiz"
          element={
            <ProtectedRoute>
              <Quiz
                onFinish={(res) => {
                  setQuizResult(res);
                  window.location.href = "/student/result";
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result"
          element={
            <ProtectedRoute>
              <Result result={quizResult} />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />

        {/* Legacy Routes (Redirects for backward compatibility) */}
        <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/quiz" element={<Navigate to="/student/quiz" replace />} />
        <Route path="/result" element={<Navigate to="/student/result" replace />} />
        <Route path="/recruiter-auth" element={<Navigate to="/auth?type=recruiter" replace />} />
        <Route path="/recruiter-dashboard" element={<Navigate to="/recruiter/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
