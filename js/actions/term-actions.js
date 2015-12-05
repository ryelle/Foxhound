import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

export default {
	/**
	 * @param  {object}  term
	 */
	fetch: function( term ) {
		AppDispatcher.handleViewAction( {
			actionType: AppConstants.REQUEST_TERM_SUCCESS,
			id: term.id,
			data: term
		} );
	},
}
