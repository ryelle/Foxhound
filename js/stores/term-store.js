import { EventEmitter } from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

import find from 'lodash/collection/find';
import findIndex from 'lodash/array/findIndex';

var CHANGE_EVENT = 'change';

/**
 * Our working term list, read-only
 * @type {array}
 * @protected
 */
var _terms = [];

/**
 * Load this array into our posts list
 *
 * @param {array} data - array of posts, pulled from API
 */
function _loadTerm( id, data ) {
	var key = findIndex( _terms, function( _term ) {
		return parseInt( id ) === parseInt( _term.id );
	} );
	if ( -1 === key ) {
		_terms.push( data );
	}
}

let TermStore = assign( {}, EventEmitter.prototype, {
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
	 * Get the current term
	 *
	 * @returns {array}
	 */
	getTerm: function( slug ) {
		var term = find( _terms, function( _term ) {
			return slug === _term.slug;
		} );
		term = term || {};
		return term;
	},

	// Watch for store actions, and dispatch the above functions as necessary.
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action; // this is our action from handleViewAction

		switch ( action.actionType ) {
			case AppConstants.REQUEST_TERM_SUCCESS:
				_loadTerm( action.id, action.data );
				break;
		}

		TermStore.emitChange();

		return true;
	} )

} );

export default TermStore;
