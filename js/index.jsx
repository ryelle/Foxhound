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

page.base( '/' );

page( '',                              Controller.setupHome, Controller.navigation, Controller.posts );
page( 'page/:page',                    Controller.setupHome, Controller.navigation, Controller.posts );

page(/^(\d{4})\/(\d{2})\/?$/,              Controller.setupDate, Controller.navigation, Controller.dateArchive );
page(/^(\d{4})\/(\d{2})\/page\/(\d*)\/?$/, Controller.setupDate, Controller.navigation, Controller.dateArchive );

page( 'category/:term',                Controller.setupTerm, Controller.navigation, Controller.termArchive );
page( 'category/:term/page/:page',     Controller.setupTerm, Controller.navigation, Controller.termArchive );
page( 'tag/:term',                     Controller.setupTerm, Controller.navigation, Controller.termArchive );
page( 'tag/:term/page/:page',          Controller.setupTerm, Controller.navigation, Controller.termArchive );

// Don't take over wp-admin
page( /^(?!wp-admin).*/,           Controller.setupSingle, Controller.navigation, Controller.post );

page.start();
