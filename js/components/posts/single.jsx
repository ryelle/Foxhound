/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

// Internal dependencies
import { getTitle, getExcerpt, getDate } from 'utils/content';

class Post extends React.Component {
    render() {
		let post = this.props;

		if ( 'attachment' === post.type ) {
			return null;
		}

		let classes = classNames( {
			entry: true
		} );

		let path = post.link.replace( FoxhoundSettings.URL.base, FoxhoundSettings.URL.path );

		return (
			<article id={ `post-${post.id}` } className={ classes }>
				<h2 className="entry-title">
					<Link to={ path } rel="bookmark" dangerouslySetInnerHTML={ getTitle( post ) } />
				</h2>

				<div className="entry-content" dangerouslySetInnerHTML={ getExcerpt( post ) } />

				<div className="entry-meta">
					<div className="entry-meta-label">published</div>
					<div className="entry-meta-value">
						<a href={ post.link } rel="bookmark">
							<time className="entry-date published updated" dateTime={ post.date }>{ getDate( post ) }</time>
						</a>
					</div>
				</div>
			</article>
		);
	}
}

export default Post;
