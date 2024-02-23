/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:'export',
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'nationalplastic_db',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': 'W7301@aishwarya#',
    }

    // env: {
    //     'MYSQL_HOST': '92.204.139.35',
    //     'MYSQL_PORT': '3306',
    //     'MYSQL_DATABASE': 'digitallab_nationalplastic_db',
    //     'MYSQL_USER': 'digitallab_nationalplastic',
    //     'MYSQL_PASSWORD': 'National@2024',
    // }
}


// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig
