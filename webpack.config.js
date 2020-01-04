const path = require('path')

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: './src/client.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader'
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.svg$/,
				use: 'svg-url-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx', 'scss']
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'client.js'
	}
}