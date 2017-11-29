var path = require( 'path' );
var webpack = require( 'webpack' );
var NODE_ENV = process.env.NODE_ENV || 'development';
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var LodashModuleReplacementPlugin = require( 'lodash-webpack-plugin' );
var UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
var webpackConfig;

// This file is written in ES5 because it is run via Node.js and is not transpiled by babel. We want to support various versions of node, so it is best to not use any ES6 features even if newer versions support ES6 features out of the box.
webpackConfig = {

	// Entry points point to the javascript module that is used to generate the script file.
	// The key is used as the name of the script.
	entry: {
		'app': './js/index.jsx',
		'customize-preview': './js/customize-preview.js',
	},
	output: {
		path: path.join( __dirname, 'build' ),
		filename: '[name].js'
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			components: path.join( __dirname, 'js/components' ),
			utils: path.resolve( __dirname, 'js/utils' ),
			test: path.resolve( __dirname, 'test' ),
		},
		modules: [ 'node_modules', 'src' ]
	},
	devtool: ( 'production' === NODE_ENV ) ? false : '#source-map',
	module: {
		// Webpack rules are applied when a resource is matches the test case
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [ /node_modules/, /Projects/ ],
				use: 'babel-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: [ /node_modules/, /Projects/ ],
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					configFile: path.join( __dirname, '.eslintrc' ),
					failOnError: true,
					quiet: true,
				},
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ]
				} ),
			}
		]
	},
	node: {
		fs: 'empty',
		process: true
	},
	plugins: [
		new LodashModuleReplacementPlugin( {
			collections: true
		} ),
		new webpack.DefinePlugin( {
			// NODE_ENV is used inside React to enable/disable features that should only
			// be used in development
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
			}
		} ),
		new ExtractTextPlugin( 'style.css' )
	]
};

if ( NODE_ENV === 'production' ) {
	// When running in production, we want to use the minified script so that the file is smaller
	webpackConfig.plugins.push( new UglifyJsPlugin() );
}

module.exports = webpackConfig;
