/**
 * Returns a page object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Page global ID
 * @return {Object}          Page object
 */
export function getPage( state, globalId ) {
	return state.pages.items[ globalId ];
}

/**
 * Returns true if a request is in progress for the specified page, or
 * false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  path   Page path
 * @return {Boolean}        Whether request is in progress
 */
export function isRequestingPage( state, path ) {
	if ( ! state.pages || ! state.pages.requests ) {
		return false;
	}

	return !! state.pages.requests[ path ];
}

/**
 * Returns the Page ID for a given path
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  path   Page path
 * @return {int}            Page ID
 */
export function getPageIdFromPath( state, path ) {
	if ( ! state.pages ||
			! state.pages.paths ||
			! state.pages.paths[ path ] ) {
		return false;
	}

	return state.pages.paths[ path ];
}
