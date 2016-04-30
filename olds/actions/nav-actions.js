import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {array}  menu  The menu items, as returned by the API
	 */
	fetch: function( menu ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_NAV_SUCCESS,
			data: menu
		} );
	},

	/**
	 * @param  {string}  message  Error message from API
	 * @param  {object}  request  The request response
	 */
	fetchFailed: function( message, request ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_NAV_ERROR,
			message: message,
			data: request
		} );
	},
}
