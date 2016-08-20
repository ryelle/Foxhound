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
import { createReduxStore } from './state';

// Accessibility!
import A11Y from 'utils/a11y';
A11Y.skipLinks();

// Now the work starts.
const store = createReduxStore();
const history = syncHistoryWithStore( browserHistory, store );
const path = FoxhoundSettings.URL.path || '/';

// Route onEnter
const routes = (
	<Router history={ history }>
		<Route path={ path } component={ Index } />
		<Route path={ `${ path }p/:paged` } component={ Index } />
		<Route path={ `${ path }search/:search` } component={ Search } />
		<Route path={ `${ path }category/:slug` } taxonomy="category" component={ Term } />
		<Route path={ `${ path }tag/:slug` } taxonomy="post_tag" component={ Term } />
		<Route path={ `${ path }date/:year` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month/:day` } component={ DateArchive } />
		<Route path={ `${ path }page/**` } component={ SinglePage } />
		<Route path={ `${ path }:year/:month/:slug` } component={ SinglePost } />
		<Route path="*" component={ NotFound } />
	</Router>
);

jQuery( '#page' ).on( 'click', 'a[rel!=external][target!=_blank]', ( event ) => {
	event.preventDefault();
	let url = event.currentTarget.href;

	url = url.replace( FoxhoundSettings.URL.base, FoxhoundSettings.URL.path );
	history.push( url );
} );

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

store.subscribe( () => {
	console.log( '## Store updated:', store.getState() );
} );
