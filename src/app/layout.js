'use client'
import { Inter } from 'next/font/google';
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import 'font-awesome/css/font-awesome.min.css'
import Header from '@/Components/layouts/Header';
import Footer from '@/Components/layouts/Footer';
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/redux/store';


// import { BrowserRouter } from 'react-router-dom';


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    
  }, []);
  useEffect(() => {
    import("jquery/dist/jquery.min.js");
  }, []);

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* <BrowserRouter> */}
        <Provider store={store}>
          <Header />
          {children}
          <ToastContainer />
          <Footer />
        </Provider>
        {/* </BrowserRouter> */}
      </body>
    </html >
  )
}
