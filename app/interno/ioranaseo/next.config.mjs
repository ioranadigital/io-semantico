/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "iorana.dev",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Headers for SEO and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      // Cache static assets
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=31536000",
          },
        ],
      },
      // Cache fonts
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // HTML pages
      {
        source: "/:path*",
        has: [{ type: "header", key: "accept", value: "text/html" }],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, stale-while-revalidate=3600",
          },
        ],
      },
      // API responses
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contacto",
        permanent: true,
      },
    ];
  },

  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              filename: "chunks/vendor.js",
              chunks: "all",
              test: /node_modules/,
              priority: 10,
              minSize: 100000,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              minSize: 50000,
            },
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "chunks/react-vendor",
              chunks: "all",
              priority: 20,
            },
            seoLib: {
              test: /[\\/]src[\\/]lib[\\/](performance|content|technical-seo)[\\/]/,
              name: "chunks/seo-lib",
              chunks: "all",
              priority: 15,
              minSize: 10000,
            },
          },
        },
      };
    }
    return config;
  },

  // Compression
  compress: true,

  // SWR and static generation
  swcMinify: true,

  // Powering
  poweredByHeader: false,

  // Production source maps
  productionBrowserSourceMaps: false,

  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "bootstrap-icons"],
  },

  // Turbopack configuration for faster builds
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
};

export default nextConfig;
