import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  comments
	 */
	fetch: function( comments, pages, total ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_COMMENTS_SUCCESS,
			pagination: pages,
			total: total,
			data: comments
		} );
	},
}
