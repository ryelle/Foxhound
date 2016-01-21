// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies

let NotFound = React.createClass( {
	setTitle: function() {
		document.title = 'Page not found';
	},

	render: function() {
		let classes = classNames( {
			entry: true
		} );

		this.setTitle();

		return (
			<article className={ classes }>
				<h2 className="entry-title">Not Found</h2>

				<div className="entry-content">
					<p>Something about no posts found.</p>
				</div>

				<div className="entry-meta"></div>
			</article>
		);
	}
} );

export default NotFound;
