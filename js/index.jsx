/* eslint-disable no-multi-spaces */
/*global FoxhoundSettings, FoxhoundData, jQuery */
// React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';

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

import { POSTS_RECEIVE, POSTS_REQUEST_SUCCESS, POST_REQUEST_SUCCESS } from 'data/state/posts';
import { PAGE_REQUEST_SUCCESS } from 'data/state/pages';

// Accessibility!
import { keyboardFocusReset, skipLink } from 'utils/a11y';

// Now the work starts.
const store = createReduxStore();
const history = syncHistoryWithStore( browserHistory, store );
const path = FoxhoundSettings.URL.path || '/';

let blogURL, frontPageRoute;
if ( FoxhoundSettings.frontPage.page ) {
	blogURL = path + 'page/' + FoxhoundSettings.frontPage.blog + '/';
	frontPageRoute = <Route path={ path } slug={ FoxhoundSettings.frontPage.page } component={ SinglePage } />;
} else {
	blogURL = path;
	frontPageRoute = null;
}

// Route onEnter
const routes = (
	<Router history={ history } render={ applyRouterMiddleware( useScroll(), keyboardFocusReset ) }>
		<Route path={ blogURL } component={ Index } />
		<Route path={ `${ blogURL }p/:paged` } component={ Index } />
		{ frontPageRoute }
		<Route path={ `${ path }search/:search` } component={ Search } />
		<Route path={ `${ path }category/:slug` } taxonomy="category" component={ Term } />
		<Route path={ `${ path }category/:slug/p/:paged` } taxonomy="category" component={ Term } />
		<Route path={ `${ path }tag/:slug` } taxonomy="post_tag" component={ Term } />
		<Route path={ `${ path }tag/:slug/p/:paged` } taxonomy="post_tag" component={ Term } />
		<Route path={ `${ path }date/:year` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/p/:paged` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month/p/:paged` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month/:day` } component={ DateArchive } />
		<Route path={ `${ path }date/:year/:month/:day/p/:paged` } component={ DateArchive } />
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

jQuery( '#page' ).on( 'click', 'a[href^=#]', ( event ) => {
	skipLink( event.target );
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
	// console.log( '## Store updated:', store.getState() );
} );

// If we have pre-loaded data, we know we're viewing the list of posts, and should pre-load it.
if ( FoxhoundData.data.length > 1 ) {
	store.dispatch( {
		type: POSTS_RECEIVE,
		posts: FoxhoundData.data
	} );

	store.dispatch( {
		type: POSTS_REQUEST_SUCCESS,
		query: { paged: 1 },
		totalPages: FoxhoundData.paging,
		posts: FoxhoundData.data
	} );
} else if ( FoxhoundData.data.length ) {
	const post = FoxhoundData.data[ 0 ];
	if ( 'page' === post.type ) {
		store.dispatch( {
			type: PAGE_REQUEST_SUCCESS,
			postId: post.id,
			pagePath: post.slug,
			page: post,
		} );
	} else {
		store.dispatch( {
			type: POSTS_RECEIVE,
			posts: [ post ]
		} );

		store.dispatch( {
			type: POST_REQUEST_SUCCESS,
			postId: post.id,
			postSlug: post.slug,
		} );
	}
}
