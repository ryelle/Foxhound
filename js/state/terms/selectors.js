/**
 * Returns a term object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Term global ID
 * @return {Object}          Term object
 */
export function getTerm( state, globalId ) {
	return state.terms.items[ globalId ];
}

/**
 * Returns true if a request is in progress for the specified term, or
 * false otherwise.
 *
 * @param  {Object}  state     Global state tree
 * @param  {String}  taxonomy  Term taxonomy
 * @param  {String}  slug      Term slug
 * @return {Boolean}           Whether request is in progress
 */
export function isRequestingTerm( state, taxonomy, slug ) {
	if ( ! state.terms.requests ) {
		return false;
	}

	const uniqId = `${taxonomy}_${slug}`
	return !! state.posts.requests[ uniqId ];
}

/**
 * Returns the Term ID for a given taxonomy/slug combo
 *
 * @param  {Object}  state     Global state tree
 * @param  {string}  taxonomy  Term taxonomy
 * @param  {string}  slug      Term slug
 * @return {int}               Term ID
 */
export function getTermIdFromSlug( state, taxonomy, slug ) {
	if ( ! state.terms ||
			! state.terms.slugs[ taxonomy ] ||
			! state.terms.slugs[ taxonomy ][ slug ] ) {
		return false;
	}

	return state.terms.slugs[ taxonomy ][ slug ];
}
