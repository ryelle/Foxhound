var path = require( 'path' );
var webpack = require( 'webpack' );
var NODE_ENV = process.env.NODE_ENV || 'development';
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var webpackConfig;

// support for Node 0.10.x https://github.com/gcorne/wp-react-boilerplate/pull/3
// require( 'es6-promise' ).polyfill();

// This file is written in ES5 because it is run via Node.js and is not transpiled by babel. We want to support various versions of node, so it is best to not use any ES6 features even if newer versions support ES6 features out of the box.
webpackConfig = {

	// Entry points point to the javascript module that is used to generate the script file.
	// The key is used as the name of the script.
	entry: {
		app: './js/index.jsx',
	},
	output: {
		path: path.join( __dirname, 'build' ),
		filename: '[name].js'
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias: {
			data: path.join( __dirname, 'js/data' ),
			components: path.join( __dirname, 'js/components' ),
			utils: path.resolve( __dirname, 'js/utils' ),
		},
		modulesDirectories: [ 'node_modules', 'src' ]
	},
	devtool: ( 'production' === NODE_ENV ) ? false : '#source-map',
	debug: ( 'production' === NODE_ENV ) ? false : true,
	module: {
		// Webpack loaders are applied when a resource is matches the test case
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015' ],
				},
			},
			{
				test: /\.jsx?$/,
				loader: 'eslint',
				exclude: [ /node_modules/ ],
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( 'style-loader', 'css!sass' )
			}
		]
	},
	eslint: {
		configFile: path.join( __dirname, '.eslintrc' ),
		failOnError: true,
		quiet: true,
	},
	node: {
		fs: 'empty',
		process: true
	},

	plugins: [
		new webpack.DefinePlugin( {

			// NODE_ENV is used inside React to enable/disable features that should only
			// be used in development
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
				endpoint: 'http://trunk.wordpress.dev/wp-json/',
			}
		} ),
		new ExtractTextPlugin( 'style.css' )
	]
};

// if ( NODE_ENV === 'production' ) {
//
// 	// When running in production, we want to use the minified script so that the file is smaller
// 	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin( {
// 		compress: {
// 			warnings: false
// 		}
// 	} ) );
// }

module.exports = webpackConfig;
