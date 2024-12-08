import { useEffect, useState, useCallback } from "react";
import "./form.css";

import { Link } from "react-router-dom";
import { login } from "../../features/auth/authAPI";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContexts";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginInput = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInput;
    if (!email || !password)
      return toast.error("Both email and password must be provided");

    try {
      const response = await dispatch(login(loginInput)).unwrap();
      toast.success(response.message);
      navigate("/");
      return;
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <div className="login-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleLoginSubmit}>
          <div className="form-info">
            <h2>Sign In !</h2>
            <p>
              Are you new here?
              <Link to="/account/register">SignUp</Link>
            </p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                value={loginInput.email}
                name="email"
                onChange={handleLoginInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={loginInput.password}
                name="password"
                onChange={handleLoginInput}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
