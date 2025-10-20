import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentModal.css";

export default function PaymentModal({ totalAmount, onClose }) {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    setStatus("processing");

    setTimeout(() => {
      setStatus("success");

      // ✅ Clear the cart from localStorage
      localStorage.removeItem("cart");

      // Close modal
      onClose();

      // Redirect to Order Success page
      navigate("/ordersuccess", { state: { totalPrice: totalAmount } });
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>💳 Demo Payment Gateway</h2>
        <p className="amount-text">
          Total Amount to Pay: <strong>₹{totalAmount.toFixed(2)}</strong>
        </p>

        {status === "processing" ? (
          <p className="processing-text">Processing your payment...</p>
        ) : (
          <button className="pay-btn" onClick={handlePayment}>
            Pay ₹{totalAmount.toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
}
