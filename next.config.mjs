/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // preserve existing HomeCalcify URL convention (/concrete-calculator/)
  poweredByHeader: false,
  compress: true,
  // Strip console.* from production bundles (keep errors/warnings).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Tree-shake icon/UI barrel imports for smaller client bundles.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // When headless WP is wired up, add its domain here:
    // remotePatterns: [{ protocol: "https", hostname: "cms.homecalcify.com" }],
  },
  async redirects() {
    return [
      // Old WordPress category slug → new hub slug (preserve link equity).
      { source: "/driveway-pavement", destination: "/driveway-paving/", permanent: true },
      { source: "/driveway-pavement/", destination: "/driveway-paving/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
