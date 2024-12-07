import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const login = true;
  if (!login) return <Navigate to="/sign-in" replace />;

  return children;
};
