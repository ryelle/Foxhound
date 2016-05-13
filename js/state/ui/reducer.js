/**
* External dependencies
*/
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { UI_POSTS_SELECT, UI_POSTS_PAGE } from 'state/action-types';

const selected = ( state = false, action ) => {
	switch ( action.type ) {
		case UI_POSTS_SELECT:
			return action.selected;
		case UI_POSTS_PAGE:
			// un-select the post when we navigate pages
			return false;
		default:
			return state;
	}
}

const page = ( state = 1, action ) => {
	switch ( action.type ) {
		case UI_POSTS_PAGE:
			if ( action.page < 1 ) {
				action.page = 1;
			}
			return action.page;
		default:
			return state;
	}
}

export default combineReducers( {
	selected,
	page
} );
