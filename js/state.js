/**
 * External Dependencies
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import posts from 'wordpress-query-posts/lib/state';
import pages from 'wordpress-query-page/lib/state';
import terms from 'wordpress-query-term/lib/state';
import comments from 'wordpress-query-comments/lib/state';
import menu from 'wordpress-query-menu/lib/state';
import media from 'wordpress-query-media/lib/state';
import users from 'wordpress-query-user/lib/state';

const reducer = combineReducers( { posts, pages, terms, comments, menu, media, users, routing: routerReducer } );

// Add the event Jetpack listens for to initialize various JS features on posts.
const emitJetpackEvent = () => next => action => {
	if ( LOCATION_CHANGE === action.type ) {
		jQuery( document.body ).trigger( 'post-load' );
	}

	return next( action );
};

const middleware = [ thunkMiddleware, emitJetpackEvent ];

let createStoreWithMiddleware = applyMiddleware.apply( null, middleware );

export function createReduxStore( initialState = {} ) {
	if (
		typeof window === 'object' &&
		window.devToolsExtension
	) {
		createStoreWithMiddleware = compose( createStoreWithMiddleware, window.devToolsExtension() );
	}
	return createStoreWithMiddleware( createStore )( reducer, initialState );
}
