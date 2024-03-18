/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/testPage",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
