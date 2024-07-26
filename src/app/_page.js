// pages/_app.js
import '../styles/globals.css';
import ScrollToTop from 'scroll-to-top-react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div className="back-to-top-header">
            <ScrollToTop displayType="htmlArrow" />

            </div>
    </>
  );
}

export default MyApp;
