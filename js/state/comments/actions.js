/* global FoxhoundSettings */
/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import {
	COMMENTS_REQUEST,
	COMMENTS_REQUEST_SUCCESS,
	COMMENTS_REQUEST_FAILURE,
	COMMENTS_RECEIVE,
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a list of comment
 * objects have been received.
 *
 * @param  {Object}  comments  Comments received
 * @return {Object}            Action object
 */
export function receiveComments( comments ) {
	return {
		type: COMMENTS_RECEIVE,
		comments
	};
}

/**
 * Triggers a network request to fetch the comments for a given post.
 *
 * @param  {int}       postId  Post ID of post to get comments for
 * @return {Function}          Action thunk
 */
export function requestComments( postId ) {
	return ( dispatch ) => {
		dispatch( {
			type: COMMENTS_REQUEST,
			postId,
		} );

		return WP.posts().id( postId ).comments().then( ( data ) => {
			dispatch( receiveComments( data ) );
			dispatch( {
				type: COMMENTS_REQUEST_SUCCESS,
				comments: data,
				count: data._paging.total,
				postId
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: COMMENTS_REQUEST_FAILURE,
				postId,
				error
			} );
		} );
	};
}
