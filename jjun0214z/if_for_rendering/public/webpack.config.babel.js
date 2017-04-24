import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	context: __dirname,
	entry: {
		polyfill: 'babel-polyfill',
		bundle: __dirname + '/src/js/main.js'
	},
	output: {
		path: __dirname + '/dist/js/',
		filename: '[name].js'
		,publicPath: path.resolve( __dirname, './dist/js' )
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			}
		]	
	},
	resolve: {
		extensions: ['.js', 'json', 'html']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			hash: true,
			filename: __dirname + '/dist/html/index.html',
			template: __dirname + '/src/html/index.html'
		})
	],
	devtool: '#inline-source-map'
};