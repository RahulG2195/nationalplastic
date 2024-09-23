// app/not-found.jsx

import Link from 'next/link';


export const metadata = {
  title: 'Page Not Found | National Plastic',
  description: 'The page you are looking for cannot be found. National Plastic, a leading manufacturer of plastic products in Mumbai, India.',
  keywords: 'National Plastic, 404, page not found, plastic products, Mumbai',
};

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <p style={styles.submessage}>
        You may have mistyped the address or the page may have moved.
      </p>
      <Link href="/" style={styles.button}>
        Back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: '48px',
    color: '#262262',
    marginBottom: '16px',
  },
  message: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '8px',
  },
  submessage: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '24px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#262262',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default NotFoundPage;