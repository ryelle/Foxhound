/**
 * Returns a comment object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Comment global ID
 * @return {Object}          Comment object
 */
export function getComment( state, globalId ) {
	return state.comments.items[ globalId ];
}

/**
 * Returns an array of comments for a given post, or null if no comments have
 * been received.
 *
 * @param  {Object}  state   Global state tree
 * @param  {int}     postId  Post ID for the queried post
 * @return {?Array}          Comments for the given post
 */
export function getCommentsForPost( state, postId ) {
	if ( ! state.comments.results[ postId ] ) {
		return null;
	}

	return state.comments.results[ postId ].map( ( globalId ) => {
		return getComment( state, globalId );
	} ).filter( Boolean );
}

/**
 * Returns true if currently requesting comments for a post ID, or false
 * otherwise.
 *
 * @param  {Object}  state   Global state tree
 * @param  {int}     postId  Post ID for the queried post
 * @return {Boolean}         Whether comments are being requested
 */
export function isRequestingCommentsForPost( state, postId ) {
	return !! state.comments.requests[ postId ];
}

/**
 * Returns the number of total comments available for a given post
 *
 * @param  {Object}  state   Global state tree
 * @param  {int}     postId  Post ID for the queried post
 * @return {int}             Number of comments
 */
export function getTotalCommentsForPost( state, postId ) {
	if ( ! state.comments.totals[ postId ] ) {
		return 0;
	}

	return parseInt( state.comments.totals[ postId ] );
}
