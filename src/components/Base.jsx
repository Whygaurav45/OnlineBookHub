  import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom";
  import { FaFacebook, FaInstagram, FaShoppingCart ,FaTwitter} from 'react-icons/fa';
  import { useEffect, useState } from "react";
  import "../index.css";

  export default function Base() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isAdmin = currentUser?.role === "admin";

    // ✅ Theme logic
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      navigate("/login");
    };

    // ✅ Search functionality
    const handleSearch = (e) => {
      e.preventDefault();
      setSearchParams({ q: searchTerm });
      navigate(`/?q=${searchTerm}`);
    };

    return (
      <>
        <header className="navbar">
          <div className="logo-area">
            <h2>📚 BookStore</h2>
          </div>

          {/* ✅ Search Bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          {/* ✅ Navbar Links */}
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>

            {!currentUser && (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}

            {currentUser && (
              <>
                {/* ✅ Show extra links based on role */}
                {isAdmin ? (
                  <>
                    <NavLink to="/registerbooks">Register Book</NavLink>
                    {/* <NavLink to="/editbooks">Edit Books</NavLink> */}
                  </>
                ) : (
                  <NavLink to="/carts">Cart 🛒</NavLink>
                )}

                <span className="welcome-text">
                  Welcome, <strong>{currentUser.name}</strong>!
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </nav>

          <button
            className="theme-toggle"
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </header>

        <main>
          <Outlet />
        </main>

        {/* ✅ Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section about">
              <h3>📚 BookStore</h3>
              <p>
                Discover, read, and enjoy from a wide collection of books that inspire
                and entertain. Your one-stop digital library.
              </p>
            </div>

            <div className="footer-section links">
              <h4>Quick Links</h4>
              <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </ul>
            </div>

            <div className="footer-section contact">
              <h4>Contact Us</h4>
              <p>📧 <a href="mailto:bookstore@gmail.com">bookstore@gmail.com</a></p>
              <p>📞 <a href="tel:+919876543210">+91 98765 43210</a></p>
              <div className="social-icons">
                <a href="https://facebook.com" >
                <FaFacebook/></a>
              
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram/></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaTwitter/></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 BookStore App — Crafted by Gaurav Naik</p>
          </div>
        </footer>
      </>
    );
  }
