import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  comments
	 */
	fetch: function( comments ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_COMMENTS_SUCCESS,
			data: comments
		} );
	},

	fetchPaginationLimit: function( total ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_COMMENTS_PAGINATION,
			data: total
		} );
	},
}
