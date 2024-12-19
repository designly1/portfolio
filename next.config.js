// next.config.js
/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const commonConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.(md|txt|html|pdf)$/i,
			loader: 'raw-loader',
		});

		// Important: return the modified config
		return config;
	},
};

module.exports = (phase, { defaultConfig }) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			reactStrictMode: true,
			...commonConfig,
		};
	}

	// Production config
	return {
		swcMinify: true,
		...commonConfig,
	};
};
