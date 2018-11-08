const Webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outPath = Path.join(__dirname, 'dist');
const sourcePath = Path.join(__dirname, './src');

module.exports = {
	context: sourcePath,
	entry: {
		main: [
			'./index.js',
		],
	},
	output: {
		path: Path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	target: 'web',
	resolve: {
		extensions: ['.js'],
		mainFields: ['browser', 'main'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /\.hbs/,
				loader: 'handlebars-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'resolve-url-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							query: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[local]__[hash:base64:5]',
							},
						},
					],
				}),
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader?limit=10000!img-loader?progressive=true',
			}
		],
	},
	plugins: [
		new Webpack.optimize.AggressiveMergingPlugin(),
		new ExtractTextPlugin({
			filename: 'styles.css',
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
};
