import keyMirror from 'keymirror';

// This list describes all actions that are possible in this app
// The actions themselves are handled in the respective *-actions.js
// & *-store.js files
// Add constants as you add functionality to the app, creating new
// *-actions/*-store files if necessary.

export default keyMirror( {
	// Post List actions
	REQUEST_POSTS: null,
	REQUEST_POSTS_SUCCESS: null,
	REQUEST_POSTS_ERROR: null,

	REQUEST_PAGINATION_LIMIT: null,

	// Category pages
	REQUEST_TERM_SUCCESS: null,

	// Post actions
	REQUEST_POST: null,
	REQUEST_POST_SUCCESS: null,
	REQUEST_POST_ERROR: null,

	// Nav actions
	REQUEST_NAV: null,
	REQUEST_NAV_SUCCESS: null,
	REQUEST_NAV_ERROR: null,
} );
