/** @type {import('next').NextConfig} */

// Set STATIC_EXPORT=true to build a static `out/` folder for shared hosting
// (e.g. Hostinger). Redirects/headers are server features and are omitted in
// that mode (they don't apply to plain static files). The default mode keeps
// full redirects + security headers.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // each route → its own folder/index.html (clean static URLs)
  poweredByHeader: false,
  compress: true,
  ...(isStaticExport ? { output: "export" } : {}),
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport, // static hosting has no image optimizer
  },
  // Server-only features — skipped for static export.
  ...(isStaticExport
    ? {}
    : {
        async redirects() {
          return [
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
      }),
};

export default nextConfig;
