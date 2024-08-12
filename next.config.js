/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['localhost', 'nationalplastic.com'],
    remotePatterns: [ 
	{ 
	  protocol: 'https', 
	  hostname: 'nationalplastic.com', 
	  pathname: '/uploads/**', 
	}
    ],
},
    api: {
	bodyParser:{
		sizeLimit: '100mb',
	}
       },

	webpack: (config) => { 
		config.resolve.alias['@uploads'] = path.resolve('/var/www/uploads'); 
		return config;
	 },
	 
}
module.exports = nextConfig;


