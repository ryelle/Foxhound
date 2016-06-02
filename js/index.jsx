/* eslint-disable no-multi-spaces */
/*global FoxhoundSettings */
// React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Load in the babel (es6) polyfill
// require( 'babel-polyfill' );

// Load the CSS
require( '../sass/style.scss' );

// Internal
import Navigation from 'components/navigation';
import Index from 'components/posts';
import SinglePost from 'components/post';
import Term from 'components/term';
import Search from 'components/search';
import DateArchive from 'components/date';
import NotFound from 'components/not-found';
import { createReduxStore } from 'state';

// Accessibility!
import A11Y from 'utils/a11y';
A11Y.skipLinks();

// Now the work starts.
const store = createReduxStore();
const history = syncHistoryWithStore( browserHistory, store );

const routes = (
	<Router history={ history }>
		<Route path="/" component={ Index } />
		<Route path="/page/:paged" component={ Index } />
		<Route path="/search/:search" component={ Search } />
		<Route path="/category/:slug" taxonomy="category" component={ Term } />
		<Route path="/tag/:slug" taxonomy="post_tag" component={ Term } />
		<Route path="/date/:year" component={ DateArchive } />
		<Route path="/date/:year/:month" component={ DateArchive } />
		<Route path="/date/:year/:month/:day" component={ DateArchive } />
		<Route path="/:year/:month/:slug" component={ SinglePost } />
		<Route path="*" component={ NotFound } />
	</Router>
);

const onNavClick = ( url ) => {
	url = url.replace( FoxhoundSettings.URL.base, '' );
	if ( url === '' ) {
		url = '/';
	}
	history.push( url );
}

const renderApp = () => {
	render(
		(
			<Provider store={ store }>
				{ routes }
			</Provider>
		),
		document.getElementById( 'main' )
	);

	render(
		<Navigation onClick={ onNavClick } />,
		document.getElementById( 'site-navigation' )
	);
}

renderApp();
store.subscribe( renderApp );
store.subscribe( () => {
	console.log( '## Store updated:', store.getState() );
} );
