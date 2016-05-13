/* global FoxhoundSettings */
/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import { API_POSTS_FETCH, API_POSTS_RECEIVE } from 'state/action-types';

export default {
	fetchPosts: function( args = {} ) {
		return ( dispatch ) => {
			const filter = Object.assign( {
				posts_per_page: 10,
				paged: 1
			}, args );

			setTimeout( () => {
				dispatch( {
					type: API_POSTS_FETCH
				} );
			}, 1 );

			WP.posts().filter( filter ).then( ( data ) => {
				dispatch( {
					type: API_POSTS_RECEIVE,
					page: parseInt( filter.paged ),
					total: parseInt( data._paging.total ),
					data
				} );
			} ).catch( ( error ) => {
				console.log( error );
			} );
		};
	}
}
