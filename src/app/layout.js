"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "@/Components/layouts/Header";
import Footer from "@/Components/layouts/Footer";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";
import dynamic from "next/dynamic";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { Metadata } from 'next'
import BackToTopButton from "@/Components/BackToTopButton/BackToTopButton";

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

  return (
    
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      
      <body className={inter.className}>
        <SessionProvider>
          <BrowserRouter>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                {!isAdmin && <Header />}
                <div className={`${isAdmin ? "pt-0 mt-0" : "mobile__top"}`}>
                  {children}
                  {/* <BackToTopButton /> */}
                </div>
                <ToastContainer />
                {!isAdmin && <Footer />}
              </PersistGate>
            </Provider>
          </BrowserRouter>
        </SessionProvider>
      </body>
    </html>
  );
}