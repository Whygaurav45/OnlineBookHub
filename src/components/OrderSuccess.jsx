import { Link, useLocation } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  return (
    <div className="success-container">
      <div className="success-box">
        <h2>🎉 Payment Successful!</h2>
        <p>
          Your order of <strong>₹{totalPrice.toFixed(2)}</strong> has been
          placed successfully.
        </p>
        <Link to="/" className="back-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
