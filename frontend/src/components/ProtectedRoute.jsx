import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const login = false;
  if (!login) return <Navigate to="/sign-in" replace />;

  return children;
};
