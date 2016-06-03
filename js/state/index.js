import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import posts from 'state/posts/reducer';
import pages from 'state/pages/reducer';
import terms from 'state/terms/reducer';
import ui from 'state/ui/reducer';

const reducer = combineReducers( {
	posts,
	pages,
	terms,
	ui,
	routing: routerReducer,
} );

let middleware = [ thunkMiddleware ];

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
