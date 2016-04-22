/**
* External dependencies
*/
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { POSTS_FETCH, POSTS_RECEIVE } from 'state/action-types';

const isFetching = ( state, action ) => {
	switch ( action.type ) {
		case POSTS_FETCH:
			// return Object.assign( {}, state, { [ action.siteId ]: true } );
		case POSTS_RECEIVE:
			// return Object.assign( {}, state, { [ action.siteId ]: false } );
		default:
			return state;
	}
}

const items = ( state = [], action ) => {
	switch ( action.type ) {
		case POSTS_FETCH:
		case POSTS_RECEIVE:
		default:
			return state;
	}
}

export default combineReducers( {
	isFetching,
	items
} );
