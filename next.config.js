/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output:'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // // images:{
  //     unoptimized:true,
  // },

  // env:{
  // 'MYSQL_HOST':'127.0.0.1',
  // 'MYSQL_DATABASE':'nationalplastic_db',
  // 'MYSQL_USER':'root',
  // 'MYSQL_PASSWORD':'Dinesh_02',
  // 'MYSQL_PORT':'3306',
  // env: {
  //     'MYSQL_HOST': '127.0.0.1',
  //     'MYSQL_PORT': '3306',
  //     'MYSQL_DATABASE': 'nationalplastic_db',
  //     'MYSQL_USER': 'root',
  //     'MYSQL_PASSWORD': 'W7301@aishwarya#',
  // }
  env: {
    'MYSQL_HOST': 'national-dev.c7iguky0mk7c.ap-south-1.rds.amazonaws.com',
    'MYSQL_DATABASE': 'nationalplastic_db',
    'MYSQL_USER': 'admin',
    'MYSQL_PASSWORD': 'National2024',
    'MYSQL_PORT': "3306",
  },
};

// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig;
//changed during
