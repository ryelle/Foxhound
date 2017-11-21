/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import { getPost } from 'wordpress-query-posts/lib/selectors';
import { getPage } from 'wordpress-query-page/lib/selectors';
import { getTitle, getContent, getDate, getFeaturedMedia } from 'utils/content';

// Components
import PostMeta from './meta';
import Media from './image';

class SinglePost extends React.Component {
    renderArticle = () => {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		const meta = {
			title: post.title.rendered + ' – ' + FoxhoundSettings.meta.title,
			description: post.excerpt.rendered,
			canonical: post.link,
		};
		meta.title = he.decode( meta.title );

		const classes = classNames( {
			entry: true
		} );
		const featuredMedia = getFeaturedMedia( post );

		return (
			<article id={ `post-${ post.id }` } className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'single', 'single-post' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
				{ featuredMedia ?
					<Media media={ featuredMedia } parentClass='entry-image' /> :
					null
				}
				<div className="entry-meta"></div>
				<div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />

				{ 'post' === post.type && <PostMeta post={ post } humanDate={ getDate( post ) } /> }
			</article>
		);
	};

    render() {
		return (
			<div className="card">
				{ this.renderArticle() }
			</div>
		);
	}
}

export default connect( ( state, ownProps ) => {
	const postId = parseInt( ownProps.id, 10 );
	const post = getPost( state, postId ) || getPage( state, postId );

	return {
		postId,
		post
	};
} )( SinglePost );
