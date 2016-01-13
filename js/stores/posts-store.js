import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

import find from 'lodash/collection/find';
import findIndex from 'lodash/array/findIndex';

var CHANGE_EVENT = 'change';

/**
 * Our working post list, read-only
 * @type {array}
 * @protected
 */
var _posts = [];

/**
 * The total number of pages available for the current archive page
 * @type {int}
 * @protected
 */
var _archive_page_limit = 1;

/**
 * The total number of posts on this archive (index, term, etc)
 * @type {int}
 * @protected
 */
var _archive_total = 0; // eslint-disable-line no-unused-vars

/**
 * Load this array into our posts list
 *
 * @param {array} data - array of posts, pulled from API
 */
function _loadPosts( data ) {
	_posts = data;
}

/**
 * Load a single post into the posts list
 *
 * @param {int}  id  post ID of the post to be inserted
 * @param {object}  data  post data, including ID, to be inserted
 */
function _loadPost( id, data ) {
	let key = findIndex( _posts, function( _post ) {
		return parseInt( id ) === parseInt( _post.id );
	} );
	if ( -1 === key ) {
		_posts.push( data );
	}
}

/**
 * Load the number into the category total container
 *
 * @param {int} total - total category pages available, pulled from API
 */
function _loadPaginationLimit( total ) {
	_archive_page_limit = parseInt( total );
}

/**
 * Load the number into the category total container
 *
 * @param {int} total - total category pages available, pulled from API
 */
function _loadTotal( total ) {
	_archive_total = parseInt( total );
}

let PostsStore = assign( {}, EventEmitter.prototype, {
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
	 * Get the post list
	 *
	 * @returns {array}  The current post list
	 */
	getPosts: function() {
		return _posts;
	},

	/**
	 * Get a post by slug (post name)
	 *
	 * @param {string}  slug  Name of the post to fetch
	 * @returns {object}  The post matching the given slug
	 */
	getPost: function( slug ) {
		let post = find( _posts, function( _post ) {
			return slug === _post.slug;
		} );
		post = post || {};
		return post;
	},

	/**
	 * Get a post by ID
	 *
	 * @param {int}  id  ID of the post to fetch
	 * @returns {object}  The post matching the given ID
	 */
	getPostById: function( id ) {
		let post;
		id = parseInt( id );
		post = find( _posts, function( _post ) {
			return id === parseInt( _post.id );
		} );
		post = post || {};
		return post;
	},

	/**
	 * Get a post's categories
	 *
	 * @param {string}  slug  Name of the post to fetch
	 * @returns {array}  A list of categories for this post
	 */
	getCategoriesForPost: function( slug ) {
		let categories;
		let post = this.getPost( slug );
		if ( post === {} ) {
			return [];
		}
		categories = find( post._embedded['https://api.w.org/term'], function( item ) {
			return ( ( item.constructor === Array ) && ( 'undefined' !== typeof item[0] ) && ( item[0].taxonomy === 'category' ) );
		} );
		return categories;
	},

	/**
	* Get a post's tags
	*
	* @param {string}  slug  Name of the post to fetch
	* @returns {array}  A list of tags for this post
	 */
	getTagsForPost: function( slug ) {
		let tags;
		let post = this.getPost( slug );
		if ( post === {} ) {
			return [];
		}
		tags = find( post._embedded['https://api.w.org/term'], function( item ) {
			return ( ( item.constructor === Array ) && ( 'undefined' !== typeof item[0] ) && ( item[0].taxonomy === 'post_tag' ) );
		} );
		return tags;
	},

	/**
	 * Get the number of available category pages
	 *
	 * @returns {array}  The total number of pages available
	 */
	getPaginationLimit: function() {
		return _archive_page_limit;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_POSTS_SUCCESS:
				_loadPosts( action.data );
				_loadPaginationLimit( action.pagination );
				_loadTotal( action.total );
				break;
			case AppConstants.REQUEST_POST_SUCCESS:
				_loadPost( action.id, action.data );
				break;
		}

		PostsStore.emitChange();

		return true;
	} )

} );

export default PostsStore;
