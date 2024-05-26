/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		APP_VERSION: "1.54",
	},
};

module.exports = nextConfig;
