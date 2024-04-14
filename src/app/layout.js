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
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const BrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

// Other routes and middleware...

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Header />
              {children}
              <ToastContainer />
              <Footer />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </body>
    </html>
  );
}
