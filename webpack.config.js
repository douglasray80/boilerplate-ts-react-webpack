const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname + '/dist'),
		publicPath: '/'
	},
	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.css']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			},
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': dotenv.parsed
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}
