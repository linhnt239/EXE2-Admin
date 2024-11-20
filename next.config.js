/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    transpilePackages: ['antd'],
    swcMinify: true,

    env: {
        API_URL: process.env.API_URL,
        GOOGLE_ANALYTICS_URL: process.env.GOOGLE_ANALYTICS_URL,
    },
};

module.exports = nextConfig;
