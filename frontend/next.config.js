/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	async rewrites() {
		return [
			// Exclude api routes that NextAuth requires
			{
				source: '/api/auth/:path*',
				destination: '/api/auth/:path*',
			},
			// Rest of API routes point to backend.
			// TODO: This doesn't work with server components and fetch???
			{
				source: '/api/:slug*',
				destination: `${process.env.DEV_API}`,
			},
		];
	},
};

module.exports = nextConfig;
