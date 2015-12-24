// React
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

// Components
import Navigation from './navigation';
import Index from './posts';
import SinglePost from './post';
import Term from './term';
import DateArchive from './date';

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
		'home': ( 'home' === type ),
		'single': ( 'single' === type ),
		'archive': ( 'archive' === type ),
		'single-page': ( 'single' === type ) && ( 'page' === _currentType ),
		'single-post': ( 'single' === type ) && ( 'post' === _currentType ),
	};

	document.body.className = classNames( bodyClass );
}

let Controller = {
	setupHome: function( context, next ) {
		_currentPage = parseInt( context.params.page ) || 1;

		setBodyClass( 'home' );
		window.scrollTo( 0, 0 );
		next();
	},

	setupDate: function( context, next ) {
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
		next();
	},

	setupTerm: function( context, next ) {
		var path = context.pathname.split('#')[0];

		_currentPage = parseInt( context.params.page ) || 1;

		if ( 'undefined' !== typeof context.params.term ) {
			_currentSlug = context.params.term;
			_currentType = path.match( /^\/category/ ) ? 'categories' : 'tags';
		}

		setBodyClass( 'archive' );
		window.scrollTo( 0, 0 );
		next();
	},

	setupSingle: function( context, next ) {
		var path = context.pathname.split('#')[0];

		if ( path.substr( -1 ) === '/' ) {
			path = path.substr( 0, path.length - 1 );
		}
		if ( path.length ) {
			_currentSlug = path.substring( path.lastIndexOf( '/' ) + 1 );
		}

		_currentType = 'post';
		if ( ! path.match( /\d{4}\/\d{2}/ ) ) {
			_currentType = 'page';
		}

		setBodyClass( 'single' );
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

	posts: function() {
		ReactDOM.render(
			<Index page={ _currentPage } />,
			document.getElementById( 'main' )
		);
	},

	dateArchive: function() {
		ReactDOM.render(
			<DateArchive { ..._currentDate } page={ _currentPage } />,
			document.getElementById( 'main' )
		);
	},

	termArchive: function() {
		ReactDOM.render(
			<Term page={ _currentPage } term={ _currentSlug } taxonomy={ _currentType } />,
			document.getElementById( 'main' )
		);
	},

	post: function() {
		ReactDOM.render(
			<SinglePost slug={ _currentSlug } type={ _currentType } />,
			document.getElementById( 'main' )
		);
	},
};

export default Controller;
