/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeFonts: true,
    productionBrowserSourceMaps: false,
    compress: true,
    cleanDistDir: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/t/p/**',
            },
        ],
    },
}

export default nextConfig;
