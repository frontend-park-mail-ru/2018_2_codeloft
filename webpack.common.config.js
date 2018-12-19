const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
					'sass-loader',
				],
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
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new CopyWebpackPlugin(([
			{ from: Path.join(__dirname, 'src/worker.js'), to: Path.join(outPath, 'worker.js') },
			{ from: Path.join(__dirname, 'src/cache.json'), to: Path.join(outPath, 'cache.json') },
			{ from: Path.join(__dirname, 'src/static/img'), to: Path.join(outPath, 'static/img') },
			{ from: Path.join(__dirname, 'src/static/Archive'), to: Path.join(outPath, 'static/Archive') },
		]))
	],
};
