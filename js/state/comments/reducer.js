/**
* External dependencies
*/
import { combineReducers } from 'redux';
import keyBy from 'lodash/keyBy';

/**
 * Internal dependencies
 */
import {
	COMMENTS_REQUEST,
	COMMENTS_REQUEST_SUCCESS,
	COMMENTS_REQUEST_FAILURE,
	COMMENTS_RECEIVE,
} from 'state/action-types';

/**
 * Tracks all known comment objects, indexed by comment ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case COMMENTS_RECEIVE:
			const comments = keyBy( [ action.page ], 'id' );
			return Object.assign( {}, state, comments );
		default:
			return state;
	}
}

/**
 * Tracks comments IDs for each post.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function results( state = {}, action ) {
	switch ( action.type ) {
		case COMMENTS_REQUEST_SUCCESS:
			return Object.assign( {}, state, {
				[ action.postId ]: action.comments.map( ( comment ) => comment.id )
			} );
		default:
			return state;
	}
}

/**
 * Returns the updated comment requests state after an action has been
 * dispatched. The state reflects a mapping of post ID to a
 * boolean reflecting whether a request for the comments is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function requests( state = {}, action ) {
	switch ( action.type ) {
		case COMMENTS_REQUEST:
		case COMMENTS_REQUEST_SUCCESS:
		case COMMENTS_REQUEST_FAILURE:
			return Object.assign( {}, state[ action.postId ], { [ action.postId ]: COMMENTS_REQUEST === action.type } );
		default:
			return state;
	}
}

/**
 * Returns the updated comment count state after an action has been
 * dispatched. The state reflects a mapping of post ID to a total count
 * of comments attached to that post.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function totals( state = {}, action ) {
	switch ( action.type ) {
		case COMMENTS_REQUEST_SUCCESS:
			return Object.assign( {}, state[ action.postId ], { [ action.postId ]: action.count } );
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	results,
	requests,
	totals
} );
