import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

// lazy imports
const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <Suspense fallback={true}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

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
