/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint ko config se hata diya kyunke naye versions mein ye yahan support nahi hota
};

export default nextConfig;