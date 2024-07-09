/** @type {import('next').NextConfig} */
const nextConfig = {
  //   reactStrictMode: false,
  // output:'export',
    // runtime: 'nodejs',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // // images:{
  //     unoptimized:true,
// },

env: {
  MYSQL_HOST: "localhost",
  MYSQL_DATABASE: "np",
  MYSQL_USER: "root",
  MYSQL_PASSWORD: "",
  MYSQL_PORT: "3306",
  RAZORPAY_KEY_ID: "rzp_test_WUEWvbWJ3T7hJ0",
  RAZORPAY_SECRET: "onArQM2aO7a1EUWCV8q7Gjrv",
  RAZORPAY_SUBCRIPTION_ID: "sub_NTYSuq8IY1beGk",
  GOOGLE_CLIENT_ID: "lorem",
  GOOGLE_CLIENT_SECRET: "lorem",
  NEXTAUTH_URL: "http://localhost:3000/",
  // NEXTAUTH_URL: "https://nationalplastic.com/",
  NEXTAUTH_SECRET: "national_plastic_secure_secret_!_@#$%^&",
  BASE_URL: "/api",
  // BASE_URL: "https://nationalplastic.com/api",
},
};

// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig;
//changed during
