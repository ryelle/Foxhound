/* eslint-disable no-multi-spaces */
// React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

// Load in the babel (es6) polyfill
// require( 'babel-polyfill' );

// Load the CSS
require( '../sass/style.scss' );

// Internal
import Index from 'components/posts';
import { createReduxStore } from 'state';

// Accessibility!
import A11Y from 'utils/a11y';
A11Y.skipLinks();

// Now the work starts.
const store = createReduxStore();

const routes = (
	<Router history={ browserHistory }>
		<Route path="/" component={ Index } />
		<Route path="/page/:paged" component={ Index } />
	</Router>
);

const renderApp = () => {
	render(
		(
			<Provider store={ store }>
				{ routes }
			</Provider>
		),
		document.getElementById( 'main' )
	);
}

renderApp();
store.subscribe( renderApp );
store.subscribe( () => {
	console.log( store.getState() );
} );
