/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Temporarily ignore ESLint during builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'localhost',
      'dolcevitapushkar.com',
      'www.dolcevitapushkar.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'api.dolcevitapushkar.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    // Enable server components external packages
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Enable webpack build worker
    webpackBuildWorker: true,
  },
  // Configure serverless function configuration
  // serverRuntimeConfig: {
  //   // Will only be available on the server side
  //   apiUrl: 'https://api.dolcevitapushkar.com',
  // },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   apiUrl:  'https://api.dolcevitapushkar.com',
  // },
  webpack: (config, { isServer, dev }) => {
    // Add custom webpack configurations here

    // Add environment variables to the client-side bundle
    // config.plugins.push(
    //   new webpack.EnvironmentPlugin({
    //     NEXT_PUBLIC_API_URL:  'https://api.dolcevitapushkar.com'
    //   })
    // );

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Add support for loading SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];

    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
      // API routes
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL || 'https://dolcevitapushkar.com',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        // CORS headers for API routes
        source: '/apii/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    console.log('API rewrites configured for backend URL:', backendUrl);

    return [
      // Proxy API requests to the backend server
      {
        source: '/apii/:path*',
        destination: 'https://api.dolcevitapushkar.com/apii/:path*',
      },
      // Keep any other rewrites you might have
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  // Environment variables that will be available on the client side
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://dolcevitapushkar.com',
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
  // Enable static exports for static site generation
  // output: 'export',
  // distDir: 'build',
  // trailingSlash: true,
  // basePath: '/dolce-vita',
  // assetPrefix: '/dolce-vita/',
};

// Configuration for bundle analysis in production
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

module.exports = withBundleAnalyzer(nextConfig);
