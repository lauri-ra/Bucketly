/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/login',
				destination: 'http://localhost:3001/api/login',
			},
			{
				source: '/api/users',
				destination: 'http://localhost:3001/api/users',
			},
		];
	},
};

module.exports = nextConfig;
