import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

// lazy imports
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const App = () => {
  return (
    <Suspense fallback={true}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
