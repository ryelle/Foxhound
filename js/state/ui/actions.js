/**
 * Internal dependencies
 */
import { UI_POSTS_SELECT, UI_POSTS_PAGE } from 'state/action-types';

export default {
	selectPost: function( selected ) {
		return ( dispatch ) => {
			dispatch( {
				type: UI_POSTS_SELECT,
				selected
			} );
		};
	},

	paginate: function( page ) {
		return ( dispatch ) => {
			dispatch( {
				type: UI_POSTS_PAGE,
				page: parseInt( page )
			} );
		};
	}
}
