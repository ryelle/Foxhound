import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {object}  term  A single term object from the API
	 */
	fetch: function( term ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_TERM_SUCCESS,
			id: term.id,
			data: term
		} );
	},

	/**
	 * @param  {string}  message  Error message
	 * @param  {object}  data     The response data from the API
	 */
	failed: function( message, data ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_TERM_ERROR,
			message: message,
			data: data
		} );
	},
}
