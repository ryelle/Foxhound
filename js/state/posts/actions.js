/* global FoxhoundSettings */
/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import { POSTS_FETCH, POSTS_RECEIVE } from 'state/action-types';

export default {
	fetchPosts: function( { page } ) {
		return ( dispatch ) => {
			setTimeout( () => {
				dispatch( {
					type: POSTS_FETCH,
					page
				} );
			}, 1 );

			WP.posts().page( page ).then( ( data ) => {
				dispatch( {
					type: POSTS_RECEIVE,
					page,
					data
				} );
			} );
		};
	},
};
