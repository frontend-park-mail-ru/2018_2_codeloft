const Merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.config.js');

module.exports = Merge(common, {
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				ie8: false,
				ecma: 8,
				output: {
					comments: false,
					beautify: false,
				},
				compress: {
					drop_console: true,
				},
				warnings: false,
			},
		}),
	],
});
