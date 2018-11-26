const Merge = require('webpack-merge');
const Path = require('path');

const common = require('./webpack.common.config.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const sourcePath = Path.join(__dirname, 'src');

module.exports = Merge(common, {
	mode: 'development',
	watch: true,
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /.spec\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'es2015'],
					cacheDirectory: true,
				},
			},
		],
	},
	devServer: {
		watchContentBase: true,
		historyApiFallback: true,
		contentBase: sourcePath,
		hot: true,
		port: 3000,
		stats: {
			warnings: false,
		},
		proxy: [
			{
				context: ['/api/**'],
				target: 'https://backend.codeloft.ru',
				pathRewrite: { '^/api': '/' },
				secure: false,
				onProxyReq: (proxyReq, req, res) => {
					proxyReq.setHeader('Host', 'backend.codeloft.ru');
				},
			},
		],
	}
});
