/**
 * External dependencies
 */
// import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import {
	getSerializedPostsQuery
} from './utils';

/**
 * Returns a post object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Post global ID
 * @return {Object}          Post object
 */
export function getPost( state, globalId ) {
	return state.posts.items[ globalId ];
}

/**
 * Returns an array of posts for the posts query, or null if no posts have been
 * received.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {?Array}         Posts for the post query
 */
export function getPostsForQuery( state, query ) {
	const serializedQuery = getSerializedPostsQuery( query );
	if ( ! state.posts.queries[ serializedQuery ] ) {
		return null;
	}

	return state.posts.queries[ serializedQuery ].map( ( globalId ) => {
		return getPost( state, globalId );
	} ).filter( Boolean );
}

/**
 * Returns true if currently requesting posts for the posts query, or false
 * otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {Boolean}        Whether posts are being requested
 */
export function isRequestingPostsForQuery( state, query ) {
	const serializedQuery = getSerializedPostsQuery( query );
	return !! state.posts.queryRequests[ serializedQuery ];
}

/**
 * Returns the number of total pages available for a given query.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {int}            Number of pages
 */
export function getTotalPagesForQuery( state, query ) {
	const serializedQuery = getSerializedPostsQuery( query );
	if ( ! state.posts.queries[ serializedQuery ] ) {
		return 1;
	}

	return parseInt( state.posts.totalPages[ serializedQuery ] );
}

/**
 * Returns true if a request is in progress for the specified post, or
 * false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Number}  postId Post ID
 * @return {Boolean}        Whether request is in progress
 */
export function isRequestingPost( state, postId ) {
	if ( ! state.posts.requests ) {
		return false;
	}

	return !! state.posts.requests[ postId ];
}
