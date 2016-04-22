import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

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
 * The total number of comments on this post
 * @type {int}
 * @protected
 */
var _comments_total = 0;

/**
 * Load this array into our comments list
 *
 * @param {array} data - array of comments, pulled from API
 */
function _loadComments( data ) {
	_comments = data;
}

/**
 * Load a single comment into the array
 *
 * @param {object} data - single comment, pulled from API
 */
function _loadComment( data ) {
	let id = data.id;
	var key = findIndex( _comments, function( _comment ) {
		return parseInt( id ) === parseInt( _comment.id );
	} );
	if ( -1 === key ) {
		_comments.push( data );
	}
}

/**
 * Load the number into the comment page container
 *
 * @param {int} total - total comment pages available, pulled from API
 */
function _loadPaginationLimit( total ) {
	_comments_page_limit = parseInt( total );
}

/**
 * Load the number into the comment page container
 *
 * @param {int} total - total comments available, pulled from API
 */
function _loadTotal( total ) {
	_comments_total = parseInt( total );
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
	 * @returns  {array}  The current list of comments
	 */
	getComments: function() {
		return _comments;
	},

	/**
	 * Get a comment, given an ID
	 * @param  {int}  id  The ID of a comment
	 * @returns  {object}  The comment for this ID, or an empty object
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
	 * @returns {int}  The total number of pages available
	 */
	getPaginationLimit: function() {
		return _comments_page_limit;
	},

	/**
	 * Get the number of available comments
	 *
	 * @returns {int}  The total number of comments available
	 */
	getTotal: function() {
		return _comments_total;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_COMMENTS_SUCCESS:
				_loadComments( action.data );
				_loadPaginationLimit( action.pagination );
				_loadTotal( action.total );
				break;
			case AppConstants.CREATE_COMMENTS_SUCCESS:
				_loadComment( action.data );
				break;
		}

		CommentsStore.emitChange();

		return true;
	} )

} );

export default CommentsStore;
