import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

var CHANGE_EVENT = 'change';

/**
 * Our working list of menu items, read-only
 * @type {array}
 * @protected
 */
var _menu = [];

/**
 * Load this array into our menu
 *
 * @param {array} data - array of menu items, pulled from API
 */
function _loadMenu( data ) {
	_menu = data;
}

/**
 * Notify the user (via dev tools for now) that the menus couldn't load.
 */
function _notifyError( message, request ) {
	let error = `Menus failed to load. The endpoint returned: ${message}: ${request.responseJSON.message}`;
	if ( 'rest_no_route' === request.responseJSON.code ) {
		error += '. Please enable the `wp-api-menus` plugin to enable this endpoint.';
	}
	console.warn( error );
}

let NavigationStore = assign( {}, EventEmitter.prototype, {
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
	 * Get the menu
	 *
	 * @returns {array}
	 */
	getMenu: function() {
		return _menu;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_NAV_SUCCESS:
				_loadMenu( action.data );
				break;
			case AppConstants.REQUEST_NAV_ERROR:
				_notifyError( action.message, action.data );
				break;
		}

		NavigationStore.emitChange();

		return true;
	} )

} );

export default NavigationStore;
