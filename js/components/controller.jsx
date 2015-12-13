// React
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

// Components
import Navigation from './navigation';
import Index from './posts';
import SinglePost from './post';
import Term from './term';

/**
 * The current slug, can be for single posts, pages, or term archives.
 * @type {array}
 * @protected
 */
var _currentSlug;

/**
 * The current page type: post, page, category, post_tag
 * @type {array}
 * @protected
 */
var _currentType;

/**
 * The current pagination value for an archive (defaults to 1 on single views)
 * @type {array}
 * @protected
 */
var _currentPage;

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
