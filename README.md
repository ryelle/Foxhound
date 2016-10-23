Foxhound
========

A react-based theme for WordPress.

Want to try out the theme? Download or clone this repo into your `/themes` folder, then run npm to install and build the javascript & CSS files. The process will look like this

	git clone https://github.com/ryelle/Foxhound foxhound
	cd foxhound
	npm install
	npm run build

Now you'll see a `build/app.js` file in the theme, and it will be available for you to switch to in wp-admin. If you're having trouble getting the theme active, please [file an issue](https://github.com/ryelle/Foxhound/issues) & I'll help you out.

_If you don't have npm installed, you can find instructions on [the npm website](http://npmjs.com)._

Setup
-----

Since this is a more "experimental" theme, you'll need to have a few things set up before it'll work.

1. You'll need the [WP REST API plugin](https://wordpress.org/plugins/rest-api/). WP 4.4 has the framework for the REST API, but the actual content of it still requires the plugin.
2. You'll also need this [WP-API Menus plugin](https://wordpress.org/plugins/wp-api-menus/). The REST API doesn't provide an endpoint for menus, so another plugin is necessary.
3. Your permalinks will need to be set to `/%year%/%monthnum%/%postname%/`. Single-post/page views will not work without permalinks set. Category & tag archives bases should be set to `category` and `tag`, respectively.

Display & Features
------------------

This theme supports your average blogging site. It looks best with "Front page displays" set to latest posts (in Settings > Reading), however it does support a static page & blog posts on another page. This theme works best for very text-focused sites. It will display featured images on single posts & pages, but not on archive/list views. There is currently no special handling for post formats.

Thanks to…
----------

These are a few of the packages/plugins that made this theme possible.

- [WP-API Plugin](http://v2.wp-api.org/) ([Core Proposal](https://make.wordpress.org/core/2016/10/08/rest-api-merge-proposal-part-2-content-api/))
- [WP API Menus Plugin](https://wordpress.org/plugins/wp-api-menus/)
- [node-wpapi](https://www.npmjs.com/package/wpapi)
- [react-document-meta](https://www.npmjs.com/package/react-document-meta)
- [react-router-scroll](https://www.npmjs.com/package/react-router-scroll)
- & of course, [Mel Choyce](https://choycedesign.com) for designing all the things.

Development
-----------

If you'd like to work on Foxhound, or use it to fork and build your own theme, there are a few other NPM scripts you can run.

`npm run dev` runs `webpack`, with configuration enabling source maps. Eventually `build` will also compress/uglify built files, so this would skip that too (but that's currently disabled).

`npm run watch` runs `webpack --watch`, everything the previous command but it will also watch the source files for changes and recompile automatically. Best to run while developing. This *does not* live reload.

`npm run lint` runs `eslint` over all the javascript files. Webpack does this as well, before compiling, but only notifies you of errors. This command will catch warnings too.

On the PHP side, we're also adding in some prefixes for permalinks (also called routes).

Known Issues/To Do
------------------

This is very much a work-in-progress theme. If you notice anything acting strange, [let me know](https://github.com/ryelle/Foxhound/issues), but it might just be that I haven't built that part yet. I also try to keep updated with new WP-API releases, but I might be a little delayed. Same deal - see anything really broken, [let me know](https://github.com/ryelle/Foxhound/issues).
