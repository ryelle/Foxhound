/* global jQuery */
import first from 'lodash/array/first';

/**
 * Internal dependencies
 */
import PostActions from '../actions/post-actions';
import TermActions from '../actions/term-actions';
import NavActions from '../actions/nav-actions';

var _noop = function() {};

var _get = function( url, data ) {
	let cacheKey = url.replace( FoxhoundSettings.URL.base, '' ) + JSON.stringify( data );
	let postData = JSON.parse( localStorage.getItem( cacheKey ) );
	if ( postData ) {
		let dfd = jQuery.Deferred();
		return dfd.resolve( postData );
	}

	return jQuery.ajax( {
		url: url,
		data: data,
		dataType: 'json',
		success: ( data ) => {
			localStorage.setItem( cacheKey, JSON.stringify( data ) );
		}
	} );
};

var _getPagination = function( url, data, request ) {
	let cacheKey = url.replace( FoxhoundSettings.URL.base, '' ) + JSON.stringify( data ) + '-pages';
	if ( 'undefined' !== typeof request ) {
		PostActions.fetchPaginationLimit( request.getResponseHeader( 'X-WP-TotalPages' ) );
		localStorage.setItem( cacheKey, request.getResponseHeader( 'X-WP-TotalPages' ) );
	} else {
		PostActions.fetchPaginationLimit( localStorage.getItem( cacheKey ) );
	}
};

export default {

	// Get /wp-api-menus/v2/menu-locations/:location
	getMenu: function( location ) {
		let url = FoxhoundSettings.URL.menuRoot + location;

		jQuery.when(
			_get( url, {} )
		).done( function( data ) {
			NavActions.fetch( data );
		} ).fail( function( request, status, message ) {
			NavActions.fetchFailed( message, request );
		} );
	},

	// Get a list of posts according to args criteria
	// args: might have pagination, or a filter (category/tag/etc)
	getPosts: function( args ) {
		let url = `${FoxhoundSettings.URL.root}/posts/`;
		args.per_page = 10;

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			_getPagination( url, data, request ); // Set the page limit in PostsStore
			PostActions.fetch( data );
		} );
	},

	// Get a single post: /{post_type}/?filter[name]={slug}
	getPost: function( slug, type ) {
		let url = `${FoxhoundSettings.URL.root}/${type}s/?filter[name]=${slug}&_embed`;

		jQuery.when(
			_get( url, {} )
		).done( function( data ) {
			if ( data.constructor === Array ) {
				data = first( data );
			}
			PostActions.fetchSingle( data );
		} );
	},

	// Get information about a term (category, tag)
	// args: term, taxonomy
	getTerm: function( args ) {
		let url = `${FoxhoundSettings.URL.root}/terms/${args.taxonomy}/`;
		args = {
			search: args.term
		};

		jQuery.when(
			_get( url, args )
		).done( function( data, status, request ) {
			if ( data.constructor === Array ) {
				data = first( data );
			}
			TermActions.fetch( data );
		} );
	},
};
