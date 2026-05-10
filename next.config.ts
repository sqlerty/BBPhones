import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'c.dns-shop.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.citilink.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.magnific.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
