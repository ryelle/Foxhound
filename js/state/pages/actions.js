/* global FoxhoundSettings */
/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import {
	PAGE_REQUEST,
	PAGE_REQUEST_SUCCESS,
	PAGE_REQUEST_FAILURE,
	PAGE_RECEIVE,
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a page object has
 * been received.
 *
 * @param  {Object}  page  Page received
 * @return {Object}        Action object
 */
export function receivePage( page ) {
	return {
		type: PAGE_RECEIVE,
		page
	};
}

/**
 * Triggers a network request to fetch a specific page from a site.
 *
 * @param  {string}   path  Path path
 * @return {Function}       Action thunk
 */
export function requestPage( path ) {
	return ( dispatch ) => {
		dispatch( {
			type: PAGE_REQUEST,
			pagePath: path
		} );

		return WP.pages().path( path ).embed().then( ( data ) => {
			const page = data[0];
			dispatch( receivePage( page ) );
			dispatch( {
				type: PAGE_REQUEST_SUCCESS,
				postId: page.id,
				pagePath: path,
				page
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: PAGE_REQUEST_FAILURE,
				pagePath: path,
				error
			} );
		} );
	};
}
