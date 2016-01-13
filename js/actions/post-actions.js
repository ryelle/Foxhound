import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  posts  The post items, as returned by the API
	 * @param  {int}  pages Total number of pages available.
	 * @param  {int}  total  Total number of posts available.
	 */
	fetch: function( posts, pages, total ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POSTS_SUCCESS,
			pagination: pages,
			total: total,
			data: posts
		} );
	},

	/**
	 * @param  {object}  post  A single post from the API
	 */
	fetchSingle: function( post ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_POST_SUCCESS,
			id: post.id,
			data: post
		} );
	},
}
