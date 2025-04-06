

/* const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig; */


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },

  //Empecher le zoom sur Iphone
  viewport: {
    //deviceScaleFactor: 1,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    //minimumScale: 1,
    userScalable: false,
  },
};


export default withNextIntl(nextConfig);
