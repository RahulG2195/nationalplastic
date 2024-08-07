/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
<<<<<<< HEAD
    domains: ["localhost", "nationalplastic.com"],
     remotePatterns: [
       {
         protocol: "https",
         hostname: "nationalplastic.com",
         pathname: "/uploads/**",
       },
     ],
  },
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
=======
    domains: ['nationalplastic.com'],
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
>>>>>>> parent of 2f9731c (env path for all assets)

	webpack: (config) => { 
		config.resolve.alias['@uploads'] = path.resolve('/var/www/uploads'); 
		return config;
	 },
}
module.exports = nextConfig;

