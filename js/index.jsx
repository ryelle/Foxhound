/**
 * Entry point for the app.
 * `page` is used to trigger the right controller for a route.
 * The controller renders the top-level component for a given page.
 */

// Load in the babel (es6) polyfill
require( 'babel-polyfill' );

// External dependencies
import page from 'page';

// Internal dependencies
import Controller from './components/controller';

page.base( '/' );

page( '/',               Controller.setup, Controller.navigation, Controller.posts );
page( '/page/:page',     Controller.setup, Controller.navigation, Controller.posts );
page( '/category/:term', Controller.setup, Controller.navigation, Controller.termArchive );
page( '/tag/:term',      Controller.setup, Controller.navigation, Controller.termArchive );

// Don't take over wp-admin
page( /^\/(?!wp-admin).*/, Controller.setup, Controller.navigation, Controller.post );

page.start();
