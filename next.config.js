/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
}

// Reference number, Number of Bedrooms, Number of Bathrooms, Numberof Employees,Number of Owners,Number of Shares - not reflecting in export
module.exports = nextConfig
