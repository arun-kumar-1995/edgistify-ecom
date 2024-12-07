import { useEffect, useState, useCallback } from "react";
import "../styles/form.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [signUpInput, setSignUpInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginInput = useCallback((e) => {
    const { name, value } = e.target;
    setSignUpInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleLoginSubmit}>
          <div className="form-info">
            <h2>Sign Up !</h2>
            <p>
              Already have an account?
              <Link to="/sign-in">SignIn</Link>
            </p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="fullName">Enter name</label>
              <input
                type="text"
                placeholder="First and last name"
                value={signUpInput.fullName}
                name="fullName"
                onChange={handleLoginInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Enter email</label>
              <input
                type="text"
                placeholder="sampleemail@gmail.com"
                value={signUpInput.email}
                name="email"
                onChange={handleLoginInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="min 8 character"
                value={signUpInput.password}
                name="password"
                onChange={handleLoginInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                placeholder=""
                value={signUpInput.confirmPassword}
                name="confirmPassword"
                onChange={handleLoginInput}
                required
              />
            </div>
            <button type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
