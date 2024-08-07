/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
<<<<<<< HEAD
<<<<<<< HEAD
    domains: ['nationalplastic.com'],
    remotePatterns: [ 
=======
    domains: ['localhost', 'nationalplastic.com'],
    /* remotePatterns: [ 
>>>>>>> c9dc16bd27d0be8bc934d7ae7e21cd77021b2599
	{ 
	  protocol: 'https', 
	  hostname: 'nationalplastic.com', 
	  pathname: '/uploads/**', 
	}
<<<<<<< HEAD
    ],
=======
    ], */
>>>>>>> c9dc16bd27d0be8bc934d7ae7e21cd77021b2599
},
    api: {
	bodyParser:{
		sizeLimit: '100mb',
	}
       },
=======
    domains: ["localhost", "nationalplastic.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "nationalplastic.com",
    //     pathname: "/uploads/**",
    //   },
    // ],
  },
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
>>>>>>> parent of c9dc16b (base path change for all prod images)

  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve("/var/www/uploads");
    return config;
  },
};
module.exports = nextConfig;
<<<<<<< HEAD

<<<<<<< HEAD

=======
>>>>>>> c9dc16bd27d0be8bc934d7ae7e21cd77021b2599
=======
>>>>>>> parent of c9dc16b (base path change for all prod images)
