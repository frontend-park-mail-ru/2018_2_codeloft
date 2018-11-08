const Webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0;
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
								sourceMap: !isProduction,
								importLoaders: 1,
								localIdentName: '[local]__[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									require('postcss-import')({addDependencyTo: Webpack}),
									require('postcss-url')(),
									require('postcss-cssnext')(),
									require('postcss-reporter')(),
									require('postcss-browser-reporter')({disabled: isProduction}),
								],
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
			},
			{
				test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
			},
		],
	},
	plugins: [
		new Webpack.optimize.AggressiveMergingPlugin(),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: !isProduction
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new CopyWebpackPlugin(([
			{ from: Path.join(__dirname, 'src/worker.js'), to: Path.join(outPath, 'worker.js') },
			{ from: Path.join(__dirname, 'src/static'), to: Path.join(outPath, 'static') }
		]))
	],
};
