/*global FoxhoundSettings */
import React from 'react';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';

const NotFound = React.createClass( {
	render() {
		const classes = classNames( {
			entry: true
		} );

		const meta = {
			title: 'Page not found – ' + FoxhoundSettings.meta.title,
		};

		return (
			<article className={ classes }>
				<DocumentMeta { ...meta } />
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
