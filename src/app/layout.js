"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "@/Components/layouts/Header";
import Footer from "@/Components/layouts/Footer";
import "./globals.css";
import BackToTopButton from '@/Components/BackToTop/BackToTopButton';
import ScrollToTop from "scroll-to-top-react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";
import dynamic from "next/dynamic";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next'
import Newslatter from "@/Components/Newslatter/newslatter";

const inter = Inter({ subsets: ["latin"] });

const BrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function RootLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const queryParams = window.location.pathname;

    if (queryParams.includes("admin")) {
      setIsAdmin(true);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (

    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KRPVWJ97');
          `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KPGV02X0G8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KPGV02X0G8');
            `,
          }}
        />
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "National Plastic",
            "alternateName": "National Plastic",          
            "url": "https://www.nationalplastic.com/",
            "logo": "https://www.nationalplastic.com/_next/image?url=https%3A%2F%2Fnationalplastic.com%2Fuploads%2Fuploads%2FNational-Plastic-Logo-New_02.png&w=1920&q=75",
            "sameAs": [
              "https://www.instagram.com/nationalplastic1952/",
              "https://www.youtube.com/@NationalPlastic1952",
              "https://www.facebook.com/NationalPlastic1952/",
              "https://in.pinterest.com/nationalplastic1952/"
            ]          
          }),
        }}
      />
      </head>

      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRPVWJ97"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <SessionProvider>
          <BrowserRouter>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                {!isAdmin && <Header />}
                <div className={`${isAdmin ? "pt-0 mt-0" : "mobile__top"}`}>
                  {children}

                </div>
                <ToastContainer />
                {!isAdmin && <Newslatter />}
                {!isAdmin && <Footer />}
                {/* <BackToTopButton /> */}

              </PersistGate>
            </Provider>
          </BrowserRouter>
        </SessionProvider>
      </body>
    </html>
  );
}
