/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Every terminal runs its own dev/build in the same checkout.
  // Next.js locks the build directory, so each one must use a distinct distDir:
  //   NEXT_DIST_DIR=".next-t3" npx next dev -p 3103
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
