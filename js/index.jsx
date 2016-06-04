/* eslint-disable no-multi-spaces */
/*global FoxhoundSettings, jQuery */
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
import SinglePage from 'components/post/page';
import Term from 'components/term';
import Search from 'components/search';
import DateArchive from 'components/date';
import NotFound from 'components/not-found';
import { setMeta } from 'utils/set-meta';
import { createReduxStore } from 'state';

// Accessibility!
import A11Y from 'utils/a11y';
A11Y.skipLinks();

// Now the work starts.
const store = createReduxStore();
const history = syncHistoryWithStore( browserHistory, store );

// Route onEnter
const routes = (
	<Router history={ history }>
		<Route onEnter={ setMeta( 'home' ) } path="/" component={ Index } />
		<Route onEnter={ setMeta( 'home' ) } path="/p/:paged" component={ Index } />
		<Route onEnter={ setMeta( 'search' ) } path="/search/:search" component={ Search } />
		<Route onEnter={ setMeta( 'category' ) } path="/category/:slug" taxonomy="category" component={ Term } />
		<Route onEnter={ setMeta( 'tag' ) } path="/tag/:slug" taxonomy="post_tag" component={ Term } />
		<Route onEnter={ setMeta( 'date' ) } path="/date/:year" component={ DateArchive } />
		<Route onEnter={ setMeta( 'date' ) } path="/date/:year/:month" component={ DateArchive } />
		<Route onEnter={ setMeta( 'date' ) } path="/date/:year/:month/:day" component={ DateArchive } />
		<Route onEnter={ setMeta( 'page' ) } path="/page/**" component={ SinglePage } />
		<Route onEnter={ setMeta( 'post' ) } path="/:year/:month/:slug" component={ SinglePost } />
		<Route onEnter={ setMeta( 'not-found' ) } path="*" component={ NotFound } />
	</Router>
);

jQuery( '#page' ).on( 'click', 'a[rel!=external][target!=_blank]', ( event ) => {
	event.preventDefault();
	let url = event.currentTarget.href;

	url = url.replace( FoxhoundSettings.URL.base, '' );
	if ( url === '' ) {
		url = '/';
	}
	history.push( url );
} );

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
		<Navigation />,
		document.getElementById( 'site-navigation' )
	);
}

renderApp();
store.subscribe( renderApp );
store.subscribe( () => {
	console.log( '## Store updated:', store.getState() );
} );
