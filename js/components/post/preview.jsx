/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import classNames from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { getPage } from 'wordpress-query-page/lib/selectors';
import { getPost } from 'wordpress-query-posts/lib/selectors';
import he from 'he';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import { getContent, getDate, getFeaturedMedia, getTitle } from 'utils/content';
import Media from './image';
import PostMeta from './meta';

class SinglePost extends React.Component {
	renderArticle = () => {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		const meta = {
			title: he.decode( `${ post.title.rendered } – ${ FoxhoundSettings.meta.title }` ),
			description: he.decode( stripTags( post.excerpt.rendered ) ),
			canonical: post.link,
		};

		const classes = classNames( {
			entry: true,
		} );
		const featuredMedia = getFeaturedMedia( post );

		return (
			<article id={ `post-${ post.id }` } className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'single', 'single-post' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
				{ featuredMedia ? <Media media={ featuredMedia } parentClass="entry-image" /> : null }
				<div className="entry-meta" />
				<div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />

				{ 'post' === post.type && <PostMeta post={ post } humanDate={ getDate( post ) } /> }
			</article>
		);
	};

	render() {
		return <div className="card">{ this.renderArticle() }</div>;
	}
}

export default connect( ( state, ownProps ) => {
	const postId = parseInt( ownProps.id, 10 );
	const post = getPost( state, postId ) || getPage( state, postId );

	return {
		postId,
		post,
	};
} )( SinglePost );
