const merge = require('webpack-merge');
const common = require('./webpack/webpack.common.config.js');

module.exports = merge(common, {
	watch: true,
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /.spec\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'es2015', 'react'],
					cacheDirectory: true
				}
			},
		]
	},
	devServer: {
		port: 3002,
		contentBase: common.context,
		disableHostCheck: true,
		historyApiFallback: true,
		openPage: '/',

		stats: {
			warnings: false
		},

		proxy: [
			{
				context: ['/api/**'],
				target: 'https://backend.codeloft.ru/',
				pathRewrite: {'^/api': '/'},
				secure: false,
				onProxyReq: (proxyReq) => {
					proxyReq.setHeader('Host', 'backend.codeloft.ru');
				}
			}
		]
	}
});
