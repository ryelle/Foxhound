var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
	progress: true,
	output: {
		publicPath: '/js/',
		path: path.resolve( __dirname, './js' ),
		filename: '[name].js',
		chunkFilename: '[id].js',
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias: {
			'utils': path.resolve( __dirname, 'js/utils' ),
		}
	},
	stats: { colors: true, reasons: true },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015' ]
				},
				exclude: [ /node_modules\/moment/ ],
			},
			{
				test: /\.jsx?$/,
				loader: 'eslint',
				exclude: [ /node_modules/ ],
			}
		]
	},
	eslint: {
		configFile: path.join( __dirname, '.eslintrc' ),
		failOnError: true,
		quiet: true,
	}
};
