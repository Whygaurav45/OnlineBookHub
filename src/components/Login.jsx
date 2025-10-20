import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  // Typing animation states
  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome to BookStore!\nYour ultimate online Store!";
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Detect mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (done) return;
    const timeout = setTimeout(() => {
      setTypedText(fullText.slice(0, index));
      if (index < fullText.length) setIndex(index + 1);
      else setDone(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [index, done]);

  // Login logic
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.pass === pass);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-outer">
      <div className="login-inner">
        {/* Left Side Animation */}
        <div className="login-left">
          {typedText}
          {!done && <span className="cursor">|</span>}
        </div>

        {/* Right Side Form */}
        <div className="login-right">
          <h1 className="login-title">Login to BookStore</h1>
          <form onSubmit={handleLogin}>
            {error && <p className="login-error">{error}</p>}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="login-footer">
            Don’t have an account?{" "}
            <Link to="/register" className="login-link">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
