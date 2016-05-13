import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import posts from 'state/posts/reducer';
import ui from 'state/ui/reducer';

const reducer = combineReducers( {
	posts,
	ui
} );

let middleware = [ thunkMiddleware ];

let createStoreWithMiddleware = applyMiddleware.apply( null, middleware );

export function createReduxStore( initialState = {} ) {
	return createStoreWithMiddleware( createStore )( reducer, initialState );
}
