import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import posts from 'wordpress-query-posts/state';
import pages from 'wordpress-query-page/state';
import terms from 'wordpress-query-term/state';
import comments from 'wordpress-query-comments/state';

let reducer = combineReducers( { posts, pages, terms, comments, routing: routerReducer } );

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
