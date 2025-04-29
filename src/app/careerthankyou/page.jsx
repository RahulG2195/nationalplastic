import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure this is installed or included in _app.tsx
import "../../styles/error.css";
import Link from "next/link";

export default function CareerThankYou() {
  return (
    <div className="container error-main-container min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-primary bg-opacity-10">
      <div
        className="card shadow-lg p-5 border-0 rounded-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="text-center error-text">
          <i className="bi bi-check-circle-fill text-danger display-3 mb-4 "></i>
          <h1 className="mb-3 fw-bold">Application Submitted</h1>
          <h5 className="fs-5 text-muted">
            Thank you for applying! Our HR team will review your application and
            get in touch if there's a fit.
          </h5>
          <Link href="/">
            <button className="error-homepage-btn">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
