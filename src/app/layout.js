"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "@/Components/layouts/Header";
import Footer from "@/Components/layouts/Footer";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/redux/store";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const BrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <BrowserRouter>
          <Provider store={store}>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </Provider>
        </BrowserRouter>
      </body>
    </html>
  );
}
