import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      setError("Email already registered ❌");
      setSuccess("");
      return;
    }

    const newUser = { name, email, pass, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registration successful ✅ Redirecting to login...");
    setError("");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Illustration */}
        <div className="register-left">
          <img
            src="/register-illustration.png"
            alt="Register Illustration"
            className="register-image"
          />
        </div>

        {/* Right Form */}
        <div className="register-right">
          <h1>Create Account</h1>
          <p className="register-subtext">Join our book community 📚</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
