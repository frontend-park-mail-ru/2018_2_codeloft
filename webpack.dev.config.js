const Merge = require('webpack-merge');
const Path = require('path');

const common = require('./webpack.common.config.js');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
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
		contentBase: sourcePath,
		disableHostCheck: true,
		hot: true,
		historyApiFallback: true,
		progress: true,
		open: true,
		port: 1000,
		stats: {
			warnings: false,
		},
		// proxy: [
		// 	{
		// 		context: ['/**'],
		// 		target: 'https://backend.codeloft.ru',
		// 		pathRewrite: { '^/': '/' },
		// 		secure: false,
		// 		onProxyReq: (proxyReq, req, res) => {
		// 			proxyReq.setHeader('Host', 'codeloft.ru');
		// 		},
		// 	},
		// ],
	},
	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:1000' }),
	],
});
