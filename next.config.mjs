/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'i.annihil.us',
				port: '',
				pathname: '/**',
			},
		],
	},
}
export default nextConfig
