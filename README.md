Foxhound
========

A react-based theme for WordPress.

Want to try out the theme? Download or clone this repo into your `/themes` folder, then run npm & gulp to install and build the javascript & CSS files. The process will look like this

	git clone https://github.com/ryelle/Foxhound foxhound
	cd foxhound
	npm install
	gulp

Now you'll see a `js/app.js` file in the theme, and it will be available for you to switch to in wp-admin. If you're having trouble getting the theme active, please [file an issue](https://github.com/ryelle/Foxhound/issues) & I'll help you out.

_If you don't have npm or gulp installed, you can find instructions on their websites: [gulp](http://gulpjs.com/), [npm](http://npmjs.com)._

Setup
-----

Since this is a more "experimental" theme, you'll need to have a few things set up before it'll work.

1. You'll need the [WP REST API plugin](https://wordpress.org/plugins/rest-api/). WP 4.4 has the framework for the REST API, but the actual content of it still requires the plugin.
2. You'll also need this [WP-API Menus plugin](https://wordpress.org/plugins/wp-api-menus/). The REST API doesn't provide an endpoint for menus, so another plugin is necessary.
3. Your permalinks will need to be set to `/%year%/%monthnum%/%postname%/`. Single-post/page views will not work without permalinks set. Category & tag archives bases should be set to `category` and `tag`, respectively.

Display & Features
------------------

A list of posts will display on the homepage - the theme will not respect the "Front page displays" setting.

Known Issues/To Do
------------------

This is very much a work-in-progress theme. If you notice anything acting strange, [let me know](https://github.com/ryelle/Foxhound/issues), but it might just be that I haven't built that part yet. I also try to keep updated with new WP-API releases, but I might be a little delayed. Same deal - see anything really broken, [let me know](https://github.com/ryelle/Foxhound/issues).

 - New loading message
 - Single post navigation (next/previous). Might need to create endpoint/setting for this.
 - Social link styles for navigation
 - Attachment pages do not work
