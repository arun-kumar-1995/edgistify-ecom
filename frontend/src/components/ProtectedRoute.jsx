import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/account/login" replace />;

  return children;
};
