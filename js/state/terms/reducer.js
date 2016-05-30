/**
* External dependencies
*/
import { combineReducers } from 'redux';
import keyBy from 'lodash/keyBy';

/**
 * Internal dependencies
 */
import {
	TERM_REQUEST,
	TERM_REQUEST_SUCCESS,
	TERM_REQUEST_FAILURE,
	TERM_RECEIVE,
} from 'state/action-types';

/**
 * Tracks all known post objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case TERM_RECEIVE:
			const terms = keyBy( [ action.term ], 'id' );
			return Object.assign( {}, state, terms );
		default:
			return state;
	}
}

/**
 * Returns the updated post requests state after an action has been
 * dispatched. The state reflects a mapping of post ID to a
 * boolean reflecting whether a request for the post is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function requests( state = {}, action ) {
	switch ( action.type ) {
		case TERM_REQUEST:
		case TERM_REQUEST_SUCCESS:
		case TERM_REQUEST_FAILURE:
			const uniqId = `${action.taxonomy}_${action.termSlug}`
			return Object.assign( {}, state[ uniqId ], { [ uniqId ]: TERM_REQUEST === action.type } );
		default:
			return state;
	}
}

/**
 * Tracks the slug->ID mapping for posts & pages
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function slugs( state = {}, action ) {
	switch ( action.type ) {
		case TERM_REQUEST_SUCCESS:
			if ( ! state[ action.taxonomy ] ) {
				return Object.assign( {}, state, {
					[ action.taxonomy ]: {
						[ action.termSlug ]: action.termId
					}
				} );
			}
			return Object.assign( {}, state[ action.taxonomy ], {
				[ action.termSlug ]: action.termId
			} );
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	requests,
	slugs
} );
