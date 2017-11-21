/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

class NotFound extends React.Component {
	render() {
		const classes = classNames( {
			entry: true,
			'entry-404': true,
		} );

		const meta = {
			title: 'Page not found – ' + he.decode( FoxhoundSettings.meta.title ),
		};

		return (
			<article className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'not-found' ] } />
				<h2 className="entry-title">Nothing Found</h2>

				<div className="entry-content">
					<p>
						It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.
					</p>
				</div>

				<div className="entry-meta" />
			</article>
		);
	}
}

export default NotFound;
