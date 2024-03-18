/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'experimental-serverless-trace',
    exportPathMap: async function () {
        return {
            '/': { page: '/' }, // Add your homepage route
        };
    },
};

export default nextConfig;
