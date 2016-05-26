/**
 * External dependencies
 */
import omitBy from 'lodash/omitBy';

/**
 * Internal dependencies
 */
import { DEFAULT_POST_QUERY } from './constants';

/**
 * Returns a normalized posts query, excluding any values which match the
 * default post query.
 *
 * @param  {Object} query Posts query
 * @return {Object}       Normalized posts query
 */
export function getNormalizedPostsQuery( query ) {
	return omitBy( query, ( value, key ) => DEFAULT_POST_QUERY[ key ] === value );
}

/**
 * Returns a serialized posts query, used as the key in the
 * `state.posts.queries` state object.
 *
 * @param  {Object} query  Posts query
 * @return {String}        Serialized posts query
 */
export function getSerializedPostsQuery( query = {} ) {
	const normalizedQuery = getNormalizedPostsQuery( query );
	return JSON.stringify( normalizedQuery ).toLocaleLowerCase();
}
