/**
* External dependencies
*/
import { combineReducers } from 'redux';
import keyBy from 'lodash/keyBy';

/**
 * Internal dependencies
 */
import {
	POST_REQUEST,
	POST_REQUEST_SUCCESS,
	POST_REQUEST_FAILURE,
	POSTS_RECEIVE,
	POSTS_REQUEST,
	POSTS_REQUEST_SUCCESS,
	POSTS_REQUEST_FAILURE
} from 'state/action-types';
import {
	getSerializedPostsQuery
} from './utils';

/**
 * Tracks all known post objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case POSTS_RECEIVE:
			const posts = keyBy( action.posts, 'id' );
			return Object.assign( {}, state, posts );
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
		case POST_REQUEST:
		case POST_REQUEST_SUCCESS:
		case POST_REQUEST_FAILURE:
			return Object.assign( {}, state[ action.postId ], { [ action.postId ]: POST_REQUEST === action.type } );
		default:
			return state;
	}
}

/**
 * Returns the updated post query requesting state after an action has been
 * dispatched. The state reflects a mapping of serialized query to whether a
 * network request is in-progress for that query.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function queryRequests( state = {}, action ) {
	switch ( action.type ) {
		case POSTS_REQUEST:
		case POSTS_REQUEST_SUCCESS:
		case POSTS_REQUEST_FAILURE:
			const serializedQuery = getSerializedPostsQuery( action.query );
			return Object.assign( {}, state, {
				[ serializedQuery ]: POSTS_REQUEST === action.type
			} );

		default:
			return state;
	}
}

/**
 * Tracks the page length for a given query.
 * @todo Bring in the "without paged" util, to reduce duplication
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function totalPages( state = {}, action ) {
	switch ( action.type ) {
		case POSTS_REQUEST_SUCCESS:
			const serializedQuery = getSerializedPostsQuery( action.query );
			return Object.assign( {}, state, {
				[ serializedQuery ]: action.totalPages
			} );
		default:
			return state;
	}
}

/**
 * Returns the updated post query state after an action has been dispatched.
 * The state reflects a mapping of serialized query key to an array of post
 * global IDs for the query, if a query response was successfully received.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function queries( state = {}, action ) {
	switch ( action.type ) {
		case POSTS_REQUEST_SUCCESS:
			const serializedQuery = getSerializedPostsQuery( action.query );
			return Object.assign( {}, state, {
				[ serializedQuery ]: action.posts.map( ( post ) => post.id )
			} );
	}

	return state;
}

export default combineReducers( {
	items,
	requests,
	totalPages,
	queryRequests,
	queries
} );
