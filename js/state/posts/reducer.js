/**
* External dependencies
*/
import { combineReducers } from 'redux';
import uniqBy from 'lodash/uniqby';

/**
 * Internal dependencies
 */
import { API_POSTS_FETCH, API_POSTS_RECEIVE, UI_POSTS_PAGE } from 'state/action-types';

const normalizePost = function( post, action ) {
	post.page = action.page;
	return post;
}

const isFetching = ( state = false, action ) => {
	switch ( action.type ) {
		case UI_POSTS_PAGE:
		case API_POSTS_FETCH:
			return true;
		case API_POSTS_RECEIVE:
			return false;
		default:
			return state;
	}
}

const items = ( state = [], action ) => {
	switch ( action.type ) {
		case API_POSTS_RECEIVE:
			let posts = action.data.map( ( item ) => {
				return normalizePost( item, action );
			} );
			let newState = [ ...state, ...posts ];
			newState = uniqBy( newState, 'id' );
			return newState;
		default:
			return state;
	}
}

const total = ( state = 0, action ) => {
	switch ( action.type ) {
		case API_POSTS_RECEIVE:
			return action.total;
		default:
			return state;
	}
}

export default combineReducers( {
	isFetching,
	total,
	items
} );
