import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const studentId = localStorage.getItem("studentId");

  return studentId ? children : <Navigate to="/auth" />;
}
