'use strict';

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

function onBuild( done ) {
	return function( err, stats ) {
		if ( err ) {
			throw new gutil.PluginError( 'webpack', err );
		}

		gutil.log( 'Building JS…', stats.toString( {
			colors: true
		} ), "\nJS finished at ", Date.now() );

		if ( done ) {
			done();
		}
	};
}

function getWebpackConfig() {
	// clone and extend webpackConfig
	var config = Object.create( require( './webpack.config.js' ) );
	config.devtool = "sourcemap";
	config.debug = true;

	config.entry = {
		app: './js/index.jsx',
		// vendor: [ 'babel-core/polyfill', 'classnames', 'moment', 'page' ]
	};

	return config;
}

function doSass() {
	if ( arguments.length ) {
		console.log('Sass file ' + arguments[0].path + ' changed.');
	}
	var start = new Date();
	console.log('Building CSS bundle');
	gulp.src( './sass/style.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './' ) )
		.on( 'end', function() {
			console.log( 'CSS finished.' );
		} );
};

gulp.task( 'sass:build', function() {
	doSass();
} );

gulp.task( 'sass:watch', function() {
	doSass();
	gulp.watch( [ './sass/**/*.scss', './js/**/*.scss' ], doSass );
} );

gulp.task( 'react:build', function( done ) {
	webpack( getWebpackConfig() ).run( onBuild( done ) );
} );

gulp.task( 'react:watch', function() {
	webpack( getWebpackConfig() ).watch( 100, onBuild() );
} );

gulp.task( 'default', ['react:build', 'sass:build'] );
gulp.task( 'watch',   ['react:watch', 'sass:watch'] );
