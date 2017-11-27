/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import classNames from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { getPostIdFromSlug, isRequestingPost, getPost } from 'wordpress-query-posts/lib/selectors';
import he from 'he';
import qs from 'qs';
import QueryPosts from 'wordpress-query-posts';

/**
 * Internal Dependencies
 */
import PostMeta from './meta';
import Media from './image';
import Comments from 'components/comments';
import Placeholder from 'components/placeholder';
import PostPreview from './preview';
import { getTitle, getContent, getDate, getFeaturedMedia } from 'utils/content';

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

				<PostMeta post={ post } humanDate={ getDate( post ) } />
			</article>
		);
	};

	renderComments = () => {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		return (
			<Comments
				protected={ post.content.protected }
				postId={ this.props.postId }
				title={ <span dangerouslySetInnerHTML={ getTitle( post ) } /> }
				commentsOpen={ 'open' === post.comment_status }
			/>
		);
	};

	render() {
		if ( !! this.props.previewId ) {
			return <PostPreview id={ this.props.previewId } />;
		}

		return (
			<div className="card">
				<QueryPosts postSlug={ this.props.slug } />
				{ this.props.loading ? <Placeholder type="post" /> : this.renderArticle() }

				{ ! this.props.loading && this.renderComments() }
			</div>
		);
	}
}

export default connect( ( state, { match, location } ) => {
	const slug = match.params.slug || false;
	const postId = getPostIdFromSlug( state, slug );
	const requesting = isRequestingPost( state, slug );
	const post = getPost( state, parseInt( postId ) );

	const query = location.search;
	const previewId = qs.parse( query ).preview_id || null;

	return {
		previewId,
		slug,
		postId,
		post,
		requesting,
		loading: requesting && ! post,
	};
} )( SinglePost );
