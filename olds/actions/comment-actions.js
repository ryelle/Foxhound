import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  comments  Comments returned from API.
	 * @param  {int}  pages Total number of pages available.
	 * @param  {int}  total  Total number of comments available.
	 */
	fetch: function( comments, pages, total ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_COMMENTS_SUCCESS,
			pagination: pages,
			total: total,
			data: comments
		} );
	},

	/**
	 * @param  {object}  comment  A single comment from the API
	 */
	create: function( comment ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.CREATE_COMMENTS_SUCCESS,
			data: comment
		} );
	},
}
