import { useEffect, useState, useCallback } from "react";
import "../styles/form.css";
import { Link } from "react-router-dom";
import { register } from "../features/auth/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../contexts/ToastContexts";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const { loading, error: apiError } = useSelector((state) => state.auth);

  const [formInput, setformInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormInput = useCallback((e) => {
    const { name, value } = e.target;
    setformInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formInput;

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");

    try {
      const response = await dispatch(register(formInput)).unwrap();
      navigate("/sign-in");
      return toast.success(response.message);
    } catch (err) {
      return toast.error(err.message);
    }
  };

  return (
    <div className="signup-container form-container">
      <div className="form-wrapper">
        <form onSubmit={handleFormSubmit}>
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
                value={formInput.fullName}
                name="fullName"
                onChange={handleFormInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Enter email</label>
              <input
                type="text"
                placeholder="sampleemail@gmail.com"
                value={formInput.email}
                name="email"
                onChange={handleFormInput}
                required
                autoComplete="on"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="min 8 character"
                value={formInput.password}
                name="password"
                onChange={handleFormInput}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-enter Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formInput.confirmPassword}
                name="confirmPassword"
                onChange={handleFormInput}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
