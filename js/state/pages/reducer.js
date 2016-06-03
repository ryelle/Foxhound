/**
* External dependencies
*/
import { combineReducers } from 'redux';
import keyBy from 'lodash/keyBy';

/**
 * Internal dependencies
 */
import {
	PAGE_REQUEST,
	PAGE_REQUEST_SUCCESS,
	PAGE_REQUEST_FAILURE,
	PAGE_RECEIVE,
} from 'state/action-types';

/**
 * Tracks all known page objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case PAGE_RECEIVE:
			const posts = keyBy( [ action.page ], 'id' );
			return Object.assign( {}, state, posts );
		default:
			return state;
	}
}

/**
 * Returns the updated page requests state after an action has been
 * dispatched. The state reflects a mapping of page ID to a
 * boolean reflecting whether a request for the page is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function requests( state = {}, action ) {
	switch ( action.type ) {
		case PAGE_REQUEST:
		case PAGE_REQUEST_SUCCESS:
		case PAGE_REQUEST_FAILURE:
			return Object.assign( {}, state[ action.pagePath ], { [ action.pagePath ]: PAGE_REQUEST === action.type } );
		default:
			return state;
	}
}

/**
 * Tracks the path->ID mapping for pages
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function paths( state = {}, action ) {
	switch ( action.type ) {
		case PAGE_REQUEST_SUCCESS:
			return Object.assign( {}, state, {
				[ action.pagePath ]: action.postId
			} );
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	requests,
	paths
} );
