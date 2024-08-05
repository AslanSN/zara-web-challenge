/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	productionBrowserSourceMaps: false,
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
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.optimization.splitChunks.cacheGroups = {
				...config.optimization.splitChunks.cacheGroups,
				commons: {
					name: 'commons',
					chunks: 'all',
					minChunks: 2,
				},
			}
		}
		return config
	},
}
export default nextConfig
