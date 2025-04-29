import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure this is installed or included in _app.tsx
import "../../styles/error.css";
import Link from "next/link";

export default function ContactThankYou() {
  return (
    <div className="container error-main-container min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-primary bg-opacity-10">
      <div
        className="card shadow-lg p-5 border-0 rounded-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="text-center error-text">
          <i className="bi bi-check-circle-fill text-danger display-3 mb-4 "></i>
          <h1 className="mb-3 fw-bold">Message Sent!</h1>
          <h5 className="fs-5 text-muted">
            Thank you for reaching out. We've received your message and will get
            back to you shortly.
          </h5>
          <Link href="/">
            <button className="error-homepage-btn">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
