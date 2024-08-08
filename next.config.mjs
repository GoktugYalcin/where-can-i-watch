import pwa from "@ducanh2912/next-pwa"

const withPWA = pwa({
    dest: 'public',
    cacheOnFrontEndNav: false,
    register: true
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
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
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                pathname: '**',
            },
        ],
    },
})

export default nextConfig;
