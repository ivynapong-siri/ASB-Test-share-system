import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    // Enable optimizePackageImports for common libraries
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@tanstack/react-query",
      "@tanstack/react-table",
      "motion",
      "swiper",
      "embla-carousel-react",
    ],
    // Optimize CSS loading
    optimizeCss: true,
    // Enable CSS optimization for better CLS
    optimizeServerReact: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dcb9450325.nxcli.io", pathname: "**" },
      // Add WordPress domains for better image optimization
      { protocol: "https", hostname: "*.wordpress.com", pathname: "**" },
      { protocol: "https", hostname: "*.wp.com", pathname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    // Optimized image sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enhanced image optimization
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable image optimization
    unoptimized: false,
    // Use default loader for better compatibility
    loader: "default",
  },
  // SWC minification is enabled by default in Next.js 15
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // Enhanced compression and caching
  generateEtags: true,
  // Enable static optimization
  trailingSlash: false,
  // Add cache headers for images and videos
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, must-revalidate",
        },
      ],
    },
    {
      source: "/:all*(mp4|webm|ogg)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, must-revalidate",
        },
        {
          key: "Accept-Ranges",
          value: "bytes",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, HEAD, OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Range",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "cross-origin",
        },
      ],
    },
    {
      source: "/_next/image",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  // Add compiler options for better optimization
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Enhanced webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize chunks for better performance
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for better caching
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
              enforce: true,
            },
            // Common chunk for shared code
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            // React and React-DOM separate chunk
            react: {
              name: "react",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: "all",
              priority: 30,
              enforce: true,
            },
            // UI libraries chunk
            ui: {
              name: "ui",
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|motion)[\\/]/,
              chunks: "all",
              priority: 25,
              enforce: true,
            },
          },
        },
        // Enable tree shaking
        usedExports: true,
        sideEffects: false,
      };
    }

    // Add WordPress image optimization
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|webp|avif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192, // 8KB limit for inline images
            fallback: "file-loader",
            publicPath: "/_next/static/images/",
            outputPath: "static/images/",
          },
        },
      ],
    });

    return config;
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
