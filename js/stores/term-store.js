import { EventEmitter } from 'events';
import assign from 'object-assign';
import page from 'page';
import AppDispatcher from '../dispatcher/dispatcher';
import AppConstants from '../constants/constants';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

var CHANGE_EVENT = 'change';

/**
 * Our working term list, read-only
 * @type {array}
 * @protected
 */
var _terms = [];

/**
 * Load a single term into the term list
 *
 * @param {int}  id  ID of the term to be inserted
 * @param {object}  data  term data, including ID, to be inserted
 */
function _loadTerm( id, data ) {
	var key = findIndex( _terms, function( _term ) {
		return parseInt( id ) === parseInt( _term.id );
	} );
	if ( -1 === key ) {
		_terms.push( data );
	}
}

/**
 * Notify the user (via dev tools for now) that the menus couldn't load.
 *
 * @param  {string}  message  Error message from API
 * @param  {object}  data     Response from API
 */
function _notifyError( message, data ) {
	const basePath = FoxhoundSettings.URL.basePath || '/';
	let error = `Term failed to load. ${message}`;
	console.warn( error, data );

	page( `${ basePath }404` );
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
	 * Get a term by slug
	 *
	 * @param {string}  slug  Name of the term to fetch
	 * @returns {object}  The term matching the given slug
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
			case AppConstants.REQUEST_TERM_ERROR:
				_notifyError( action.message, action.data );
				break;
		}

		TermStore.emitChange();

		return true;
	} )

} );

export default TermStore;
