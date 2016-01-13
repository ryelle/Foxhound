/**
 * Entry point for the app.
 * `page` is used to trigger the right controller for a route.
 * The controller renders the top-level component for a given page.
 */

// Load in the babel (es6) polyfill
require( 'babel-polyfill' );

// External dependencies
import page from 'page';
import A11Y from 'utils/a11y';
A11Y.skipLinks();

// Internal dependencies
import Controller from './components/controller';

const basePath = FoxhoundSettings.URL.basePath || '/';
page.base( basePath );

page( '*', Controller.parse, Controller.load );

page( '',                              Controller.navigation, Controller.posts );
page( 'page/:page',                    Controller.navigation, Controller.posts );

page(/^(\d{4})\/(\d{2})\/(\d{2})\/?$/,                Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/(\d{2})\/(\d{2})\/(page)\/(\d*)\/?$/, Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/(\d{2})\/?$/,                         Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/(\d{2})\/(page)\/(\d*)\/?$/,          Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/?$/,                                  Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/(page)\/(\d*)\/?$/,                   Controller.navigation, Controller.dateArchive );

page( 'category/:term',                Controller.navigation, Controller.termArchive );
page( 'category/:term/page/:page',     Controller.navigation, Controller.termArchive );
page( 'tag/:term',                     Controller.navigation, Controller.termArchive );
page( 'tag/:term/page/:page',          Controller.navigation, Controller.termArchive );

page( 'search/:term',                  Controller.navigation, Controller.search );

// Don't take over wp-admin
page( /^(?!wp-admin).*/,           Controller.navigation, Controller.post );

page.start();
