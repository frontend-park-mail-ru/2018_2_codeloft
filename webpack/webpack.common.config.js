const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0;
const outPath = path.join(__dirname, '../dist');
const sourcePath = path.join(__dirname, '../src');

module.exports = {
	context: sourcePath,
	entry: {
		main: './index.tsx',
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-dom',
			'redux',
		]
	},
	output: {
		path: outPath,
		publicPath: `/${process.env.NODE_ENV === 'development' ? '' : 'redesign/'}`,
		filename: 'bundle.js'
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		mainFields: ['browser', 'main']
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				enforce: 'pre',
				loader: 'tslint-loader'
			},
			{
				test: /\.tsx?$/,
				use: isProduction
					? 'awesome-typescript-loader?module=es6'
					: [
						'react-hot-loader/webpack',
						'awesome-typescript-loader'
					]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'resolve-url-loader',
					'sass-loader'
				]
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
								localIdentName: '[local]__[hash:base64:5]'
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									require('postcss-import')({addDependencyTo: webpack}),
									require('postcss-url')(),
									require('postcss-cssnext')(),
									require('postcss-reporter')(),
									require('postcss-browser-reporter')({disabled: isProduction})
								]
							}
						}
					]
				})
			},
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader?limit=10000!img-loader?progressive=true'
			},
			{
				test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChunks: Infinity
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: !isProduction
		}),
		new HtmlWebpackPlugin({template: 'index.html'}),
		new LodashModuleReplacementPlugin({
			shorthands: true,
			cloning: true,
			currying: true,
			collections: true,
			coercions: true,
			flattening: true,
			paths: true
		}),
		new CopyWebpackPlugin([{
			from: 'statics/imgs',
			to: 'statics/imgs'
		}, {
			from: 'statics/Archive',
			to: 'statics/Archive'
		}, {
			from: './cache.json',
			to: 'cache.json'
		}, {
			from: './worker.js',
			to: 'worker.js'
		}])
	],
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
