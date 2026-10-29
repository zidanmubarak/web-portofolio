/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every terminal runs its own dev/build in the same checkout.
  // Next.js locks the build directory, so each one must use a distinct distDir:
  //   NEXT_DIST_DIR=".next-t3" npx next dev -p 3103
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { unoptimized: true },
};

module.exports = nextConfig;
