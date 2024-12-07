import { useEffect, useState, useCallback } from "react";
import "../styles/form.css";
import logo from "/assets/logo.jpg";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";

const SignIn = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const handleLoginInput = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleLoginSubmit}>
          <div className="form-info">
            <h2>Sign In !</h2>
            <p>
              Are you new here?
              <Link to="/sign-up">SignUp</Link>
            </p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter username"
                value={loginInput.email}
                name="email"
                onChange={handleLoginInput}
                required
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
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
