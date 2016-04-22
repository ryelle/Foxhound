/**
 * Internal dependencies
 */
import API from 'utils/api';
import { POSTS_FETCH, POSTS_RECEIVE } from 'state/action-types';

export default {
	fetchSinglePost: function( postSlug, postType ) {
		return ( dispatch ) => {
			setTimeout( () => {
				dispatch( {
					type: POSTS_FETCH,
					postSlug
				} );
			}, 1 );

			API.getPost( postSlug, postType, ( data, error ) => { // eslint-disable-line
				// if ( error ) {}
				dispatch( {
					type: POSTS_RECEIVE,
					data
				} );
			} );
		};
	}
};
