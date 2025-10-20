import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal"; // ✅ import modal

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false); // ✅ modal toggle
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (bookId) => {
    const updatedCart = cart.filter((item) => item.id !== bookId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your Cart is Empty</h2>
        <p>Add some books to your cart.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Your Cart</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Book</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Quantity</th>
            <th style={{ textAlign: "center", padding: "10px" }}>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((book) => (
            <tr key={book.id} style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={book.photo}
                  alt={book.title}
                  style={{
                    width: "60px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <span>{book.title}</span>
              </td>
              <td style={{ textAlign: "center" }}>₹{book.price}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="number"
                  min="1"
                  value={book.quantity}
                  onChange={(e) =>
                    updateQuantity(book.id, parseInt(e.target.value))
                  }
                  style={{ width: "60px", textAlign: "center", padding: "5px" }}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                ₹{(book.price * book.quantity).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => removeItem(book.id)}
                  style={{
                    backgroundColor: "#E74C3C",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          textAlign: "right",
          marginTop: "30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        Total: ₹{totalPrice.toFixed(2)}
      </div>

      <div style={{ marginTop: "30px", textAlign: "right" }}>
        <button
          onClick={() => setShowPayment(true)} // ✅ open modal
          style={{
            backgroundColor: "#2C3E50",
            color: "white",
            padding: "12px 24px",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "1rem",
            border: "none",
          }}
        >
          Checkout
        </button>
      </div>

      {/* ✅ Payment Modal */}
      {showPayment && (
        <PaymentModal
          totalAmount={totalPrice}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
