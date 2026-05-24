/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ye line build ke waqt type errors ko ignore karegi
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ye line build ke waqt lint errors ko ignore karegi
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;