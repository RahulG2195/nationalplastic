/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:'export',
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },

    env:{
        'MYSQL_HOST':'127.0.0.1',
        'MYSQL_DATABASE':'nationalplastic_db',
        'MYSQL_USER':'root',
        'MYSQL_PASSWORD':'mySQL@123',
        'MYSQL_PORT':'3306',
    // env: {
    //     'MYSQL_HOST': '127.0.0.1',
    //     'MYSQL_PORT': '3306',
    //     'MYSQL_DATABASE': 'nationalplastic_db',
    //     'MYSQL_USER': 'root',
    //     'MYSQL_PASSWORD': 'W7301@aishwarya#',
    // }
}

// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig
