/* global FoxhoundSettings */
// React
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import page from 'page';
import qs from 'qs';

// Components
import Navigation from './navigation';
import Index from './posts';
import SinglePost from './post';
import Term from './term';
import DateArchive from './date';
import SearchList from './search';
import NotFound from './not-found';

/**
 * The current slug, can be for single posts, pages, or term archives.
 * @type {string}
 * @protected
 */
var _currentSlug;

/**
 * The current page type: post, page, category, post_tag
 * @type {string}
 * @protected
 */
var _currentType;

/**
 * The current pagination value for an archive (defaults to 1 on single views)
 * @type {int}
 * @protected
 */
var _currentPage;

/**
 * The current date value for an archive
 * @type {object}
 * @protected
 */
var _currentDate;

/**
 * Set the classes on the <body> tag.
 *
 * @param {string} type - the type of page this is
 */
var setBodyClass = function( type ) {
	let bodyClass = {
		'logged-in': ( parseInt( FoxhoundSettings.user ) !== 0 ),
		'not-found': ( '404' === type ),
		'home': ( 'home' === type ),
		'single': ( 'single' === type ),
		'archive': ( 'archive' === type ),
		'single-page': ( 'single' === type ) && ( 'page' === _currentType ),
		'single-post': ( 'single' === type ) && ( 'post' === _currentType ),
	};

	document.body.className = classNames( bodyClass );
}

let Controller = {
	parse: function( context, next ) {
		context.query = qs.parse( location.search.slice( 1 ) );
		next();
	},

	load: function( context, next ) {
		window.scrollTo( 0, 0 );
		next();
	},

	navigation: function( context, next ) {
		ReactDOM.render(
			<Navigation />,
			document.getElementById( 'site-navigation' )
		);

		next();
	},

	notFound: function( context ) { // eslint-disable-line
		setBodyClass( '404' );

		ReactDOM.render(
			<NotFound />,
			document.getElementById( 'main' )
		);
	},

	posts: function( context ) {
		setBodyClass( 'home' );

		if ( Object.keys( context.query ).length && ( 'undefined' !== typeof context.query.s ) ) {
			const basePath = FoxhoundSettings.URL.basePath || '/';
			page( `${ basePath }search/${ context.query.s }` );
			return;
		}

		if ( FoxhoundSettings.pageOnFront && '/' === context.path ) {
			context.pathname = `/${FoxhoundSettings.pageOnFront}/`;
			return Controller.post( context );
		}

		_currentPage = parseInt( context.params.page ) || 1;

		ReactDOM.render(
			<Index page={ _currentPage } />,
			document.getElementById( 'main' )
		);
	},

	dateArchive: function( context ) {
		_currentDate = {
			year: context.params[0],
		};

		if ( 'page' !== context.params[1] ) {
			_currentDate.month = context.params[1];
			if ( 'page' !== context.params[2] ) {
				_currentDate.day = context.params[2];
				_currentPage = parseInt( context.params[4] ) || 1;
			} else {
				_currentPage = parseInt( context.params[3] ) || 1;
			}
		} else {
			_currentPage = parseInt( context.params[2] ) || 1;
		}

		setBodyClass( 'archive' );

		ReactDOM.render(
			<DateArchive { ..._currentDate } page={ _currentPage } />,
			document.getElementById( 'main' )
		);
	},

	termArchive: function( context ) {
		var path = context.pathname.split( '#' )[0];

		_currentPage = parseInt( context.params.page ) || 1;

		if ( 'undefined' !== typeof context.params.term ) {
			_currentSlug = context.params.term;
			_currentType = path.match( /^\/category/ ) ? 'categories' : 'tags';
		}

		setBodyClass( 'archive' );

		ReactDOM.render(
			<Term page={ _currentPage } term={ _currentSlug } taxonomy={ _currentType } />,
			document.getElementById( 'main' )
		);
	},

	search: function( context ) {
		_currentPage = parseInt( context.params.page ) || 1;
		_currentSlug = context.params.term;

		setBodyClass( 'search' );

		ReactDOM.render(
			<SearchList page={ _currentPage } term={ _currentSlug } />,
			document.getElementById( 'main' )
		);
	},

	post: function( context ) {
		var path = context.pathname.split( '#' )[0];

		if ( '/404' === path ) {
			Controller.notFound( context );
			return;
		}

		if ( path.substr( -1 ) === '/' ) {
			path = path.substr( 0, path.length - 1 );
		}

		if ( path.length ) {
			_currentSlug = path.substring( path.lastIndexOf( '/' ) + 1 );
		}

		console.log( context );
		if ( FoxhoundSettings.blogPage && `/${FoxhoundSettings.blogPage}/` === context.pathname ) {
			context.pathname = '/';
			return Controller.posts( context );
		}

		_currentType = 'post';
		if ( ! path.match( /\d{4}\/\d{2}/ ) ) {
			_currentType = 'page';
		}

		setBodyClass( 'single' );

		ReactDOM.render(
			<SinglePost slug={ _currentSlug } type={ _currentType } />,
			document.getElementById( 'main' )
		);
	},
};

export default Controller;
