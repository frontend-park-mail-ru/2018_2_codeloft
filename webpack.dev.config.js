const Merge = require('webpack-merge');
const Path = require('path');

const common = require('./webpack.common.config.js');
const sourcePath = Path.join(__dirname, 'src');

module.exports = Merge(common, {
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
		port: 3000,
		//open: process.env.WEBPACK_SERVER_BROWSER || 'Firefox',
		stats: {
			warnings: false,
		},
		proxy: [
			{
				context: ['/api/**'],
				target: 'https://backend.codeloft.ru',
				pathRewrite: {'^/api': '/'},
				secure: false,
				onProxyReq: (proxyReq, req, res) => {
					proxyReq.setHeader('Host', 'backend.codeloft.ru');
				},
			},
		],
	},
});
