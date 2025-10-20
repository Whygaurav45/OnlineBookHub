import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterBook.css'

export default function RegisterBooks() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    category: "",
    photo: null, // store File object
    dop: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setBook({ ...book, photo: files[0] });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("category", book.category);
    formData.append("dop", book.dop);
    if (book.photo) formData.append("photo", book.photo);

    await fetch("http://localhost:5000/books", {
      method: "POST",
      body: formData,
    });

    navigate("/");
  };

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "30px",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#2c3e50",
            letterSpacing: "1px",
          }}
        >
          📚 Register New Book
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Book Title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                fontWeight: "600",
                color: "#34495e",
              }}
            >
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              required
            />
          </div>

          {/* Category */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                fontWeight: "600",
                color: "#34495e",
              }}
            >
              Book Category
            </label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                backgroundColor: "#fff",
                
              }}
              required
            >
              <option value="">Select category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          {/* Photo Upload */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                fontWeight: "600",
                color: "#34495e",
              }}
            >
              Book Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Date of Publish */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "6px",
                fontWeight: "600",
                color: "#34495e",
              }}
            >
              Book Date of Publish
            </label>
            <input
              type="date"
              name="dop"
              value={book.dop}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "15px",
                transition: "all 0.3s ease",
              }}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "linear-gradient(135deg, #4283caff, #083a5aff)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #4283caff, #083a5aff)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #4283caff, #083a5aff)";
              e.target.style.transform = "scale(1)";
            }}
          >
            ➕ Add New Book
          </button>
        </form>
      </div>
    </>
  );
}
