import { POSTS_RECEIVE, POSTS_REQUEST_SUCCESS, POST_REQUEST_SUCCESS } from 'wordpress-query-posts/lib/state';
import { PAGE_REQUEST_SUCCESS } from 'wordpress-query-page/lib/state';

/**
 * Force-set a single post object by firing the correct actions
 *
 * @param  {object}   post      Post object
 * @return {Function}           Action thunk
 */
export function setPost( post ) {
	return ( dispatch ) => {
		if ( 'page' === post.type ) {
			dispatch( {
				type: PAGE_REQUEST_SUCCESS,
				postId: post.id,
				pagePath: post.slug,
				page: post,
			} );
		} else {
			dispatch( {
				type: POSTS_RECEIVE,
				posts: [ post ]
			} );

			dispatch( {
				type: POST_REQUEST_SUCCESS,
				postId: post.id,
				postSlug: post.slug,
			} );
		}
	};
}

/**
 * Force-set a list of post object by firing the correct actions
 *
 * @param  {array}    posts       List of post objects
 * @param  {number}   totalPages  Total pages for this query
 * @return {Function}             Action thunk
 */
export function setPosts( posts, totalPages ) {
	return ( dispatch ) => {
		dispatch( {
			type: POSTS_RECEIVE,
			posts,
		} );

		dispatch( {
			type: POSTS_REQUEST_SUCCESS,
			query: { sticky: false, page: 1 },
			totalPages,
			posts
		} );
	};
}
