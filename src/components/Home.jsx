import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../index.css";
import "./Home.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// CountUp Component for stats
function CountUp({ end, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 5);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function Home() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q")?.toLowerCase() || "";

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser?.role === "admin";

  // Fetch books
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  // Add to Cart
  const handleAddToCart = (book) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === book.id);
    if (existing) {
      cart = cart.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cart.push({ ...book, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} added to cart!`);
  };

  // Buy Now
  const handleBuyNow = (book) => {
    localStorage.setItem("buyNowBook", JSON.stringify(book));
    navigate("/payment");
  };

  // Delete book (admin)
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/books/${id}`, { method: "DELETE" });
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // Filter + Pagination
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>Find the Book You’re Looking For</h1>
          <p>
            Dive into a world of knowledge and imagination. Discover books that
            inspire, educate, and entertain — all in one place.
          </p>
          <a href="#books-section" className="explore-btn">
            Browse Collection
          </a>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
            alt="Stack of books"
          />
        </div>
      </div>

      {/* Books Section */}
      <h2 id="books-sssection" className="books-heading">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Available Books"}
      </h2>

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No books found</p>
      ) : (
        <>
          <div className="book-grid">
            {currentBooks.map((book) => (
              <div className="book-card" key={book.id}>
                <img src={book.photo} alt={book.title} />
                <h3>{book.title}</h3>
                <p className="price">₹{book.price}</p>

                {currentUser && (
                  <>
                    {isAdmin ? (
                      <div className="admin-actions">
                        <Link to={`/edit/${book.id}`} className="edit-link">
                          Edit
                        </Link>
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="user-actions">
                        <button className="btn" onClick={() => handleAddToCart(book)}>
                          Add to Cart
                        </button>
                        <button className="btn buy-btn" onClick={() => handleBuyNow(book)}>
                          Buy Now
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Bookify, your ultimate destination for discovering and
              purchasing books across various genres. Whether you're a casual reader
              or a bibliophile, we offer a curated selection to cater to all tastes.
            </p>
            <p>
              Our mission is to make reading accessible and enjoyable for everyone,
              providing a seamless online shopping experience with prompt delivery
              and excellent customer service.
            </p>
          </div>
          {/* <div className="about-image">
            <img src="src/assets/img123.jpg" alt="Bookify Store" />
          </div> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3><CountUp end={2023} duration={2000} /></h3>
            <p>Established</p>
          </div>
          <div className="stat-item">
            <h3><CountUp end={10000} duration={2000} suffix="+" /></h3>
            <p>Books Sold</p>
          </div>
          <div className="stat-item">
            <h3><CountUp end={3000} duration={2000} suffix="+" /></h3>
            <p>Trusted Users</p>
          </div>
        </div>
      </section>
    </div>
  );
}
