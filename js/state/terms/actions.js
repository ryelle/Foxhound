/* global FoxhoundSettings */
import find from 'lodash/find';

/**
 * Internal dependencies
 */
const WP = require( 'wordpress-rest-api' )( { endpoint: FoxhoundSettings.URL.root } );
import {
	TERM_REQUEST,
	TERM_REQUEST_SUCCESS,
	TERM_REQUEST_FAILURE,
	TERM_RECEIVE,
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a term object has
 * been received.
 *
 * @param  {Object}  term  Term received
 * @return {Object}        Action object
 */
export function receiveTerm( term ) {
	return {
		type: TERM_RECEIVE,
		term
	};
}

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string}   taxonomy  Term taxonomy
 * @param  {string}   termSlug  Term slug
 * @return {Function}           Action thunk
 */
export function requestTerm( taxonomy, termSlug ) {
	return ( dispatch ) => {
		dispatch( {
			type: TERM_REQUEST,
			taxonomy,
			termSlug
		} );

		let taxonomyFunc;
		if ( 'category' === taxonomy ) {
			taxonomyFunc = 'categories';
		} else if ( 'tag' === taxonomy ) {
			taxonomyFunc = 'tags';
		} else {
			taxonomyFunc = 'taxonomies';
		}

		return WP[taxonomyFunc]().search( termSlug ).then( ( data ) => {
			const term = find( data, {
				slug: termSlug
			} );
			dispatch( receiveTerm( term ) );
			dispatch( {
				type: TERM_REQUEST_SUCCESS,
				taxonomy,
				termSlug,
				termId: term.id,
			} );
			return null;
		} ).catch( ( error ) => {
			dispatch( {
				type: TERM_REQUEST_FAILURE,
				taxonomy,
				termSlug,
				error
			} );
		} );
	};
}
