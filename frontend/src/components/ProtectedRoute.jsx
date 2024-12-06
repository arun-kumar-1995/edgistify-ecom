import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const login = false;
  if (!login) <Navigate to="/login" />;

  return children;
};
