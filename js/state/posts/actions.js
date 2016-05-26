/* global FoxhoundSettings */
/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import {
	POST_REQUEST,
	POST_REQUEST_SUCCESS,
	POST_REQUEST_FAILURE,
	POSTS_RECEIVE,
	POSTS_REQUEST,
	POSTS_REQUEST_SUCCESS,
	POSTS_REQUEST_FAILURE
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a post object has
 * been received.
 *
 * @param  {Object} post Post received
 * @return {Object}      Action object
 */
export function receivePost( post ) {
	return receivePosts( [ post ] );
}

/**
 * Returns an action object to be used in signalling that post objects have
 * been received.
 *
 * @param  {Array}  posts Posts received
 * @return {Object}       Action object
 */
export function receivePosts( posts ) {
	return {
		type: POSTS_RECEIVE,
		posts
	};
}

/**
 * Triggers a network request to fetch posts for the specified site and query.
 *
 * @param  {String}   query  Post query
 * @return {Function}        Action thunk
 */
export function requestPosts( query = {} ) {
	return ( dispatch ) => {
		dispatch( {
			type: POSTS_REQUEST,
			query
		} );

		return WP.posts().filter( query ).then( ( data ) => {
			dispatch( receivePosts( data ) );
			dispatch( {
				type: POSTS_REQUEST_SUCCESS,
				query,
				posts: data
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: POSTS_REQUEST_FAILURE,
				query,
				error
			} );
		} );
	};
}

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {Number}   postId Post ID
 * @return {Function}        Action thunk
 */
export function requestPost( postId ) {
	return ( dispatch ) => {
		dispatch( {
			type: POST_REQUEST,
			postId
		} );

		return WP.posts().id( postId ).then( ( post ) => {
			dispatch( receivePost( post ) );
			dispatch( {
				type: POST_REQUEST_SUCCESS,
				postId
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: POST_REQUEST_FAILURE,
				postId,
				error
			} );
		} );
	};
}
