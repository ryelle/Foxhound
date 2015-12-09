import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';
import find from 'lodash/collection/find';

var CHANGE_EVENT = 'change';

/**
 * Our working comments list, read-only
 * @type {array}
 * @protected
 */
var _comments = [];

/**
 * The total number of pages available for this post's comments
 * @type {int}
 * @protected
 */
var _comments_page_limit = 1;

/**
 * Load this array into our comments list
 *
 * @param {array} data - array of comments, pulled from API
 */
function _loadComments( data ) {
	_comments = data;
}

/**
 * Load the number into the comment page container
 *
 * @param {int} total - total comment pages available, pulled from API
 */
function _loadPaginationLimit( total ) {
	_comments_page_limit = parseInt( total );
}

let CommentsStore = assign( {}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit( CHANGE_EVENT );
	},

	addChangeListener: function( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	removeChangeListener: function( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	},

	/**
	 * Get the comments list
	 *
	 * @returns {array}
	 */
	getComments: function() {
		return _comments;
	},

	/**
	 * Get the current post
	 *
	 * @returns {array}
	 */
	getComment: function( id ) {
		var comment = find( _comments, function( _comment ) {
			return id === _comment.id;
		} );
		comment = comment || {};
		return comment;
	},

	getCommentAuthorName: function( id ) {
		let comment = this.getComment( id );
		if ( 'undefined' !== typeof comment.author_name ) {
			return comment.author_name;
		}
		return '';
	},

	/**
	 * Get the number of available category pages
	 *
	 * @returns {array}
	 */
	getPaginationLimit: function() {
		return _comments_page_limit;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_COMMENTS_SUCCESS:
				_loadComments( action.data );
				break;
			case AppConstants.REQUEST_COMMENTS_PAGINATION:
				_loadPaginationLimit( action.data );
				break;
		}

		CommentsStore.emitChange();

		return true;
	} )

} );

export default CommentsStore;
