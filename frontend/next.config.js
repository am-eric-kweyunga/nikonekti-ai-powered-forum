/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
      // This could be anything, using the latest git hash
      return process.env.GIT_HASH || "dev-build"
  },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '*',
              port: '',
          },
      ],
  }
}

module.exports = nextConfig