/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { getPostIdFromSlug, isRequestingPost, getPost } from 'data/state/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import PostMeta from './meta';
import Media from './image';
import Comments from 'components/comments';
import Placeholder from 'components/placeholder';

const SinglePost = React.createClass( {
	mixins: [ ContentMixin ],

	renderArticle() {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		const meta = {
			title: post.title.rendered + ' – ' + FoxhoundSettings.meta.title,
			description: post.excerpt.rendered,
			canonical: post.link,
		};

		const classes = classNames( {
			entry: true
		} );
		const featuredMedia = this.getFeaturedMedia( post );

		return (
			<article id={ `post-${ post.id }` } className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'single', 'single-post' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ this.getTitle( post ) } />
				{ featuredMedia ?
					<Media media={ featuredMedia } parentClass='entry-image' /> :
					null
				}
				<div className="entry-meta"></div>
				<div className="entry-content" dangerouslySetInnerHTML={ this.getContent( post ) } />

				<PostMeta post={ post } humanDate={ this.getDate( post ) } />
			</article>
		);
	},

	renderComments() {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		return (
			<Comments
				protected={ post.content.protected }
				postId={ this.props.postId }
				title={ <span dangerouslySetInnerHTML={ this.getTitle( post ) } /> }
				commentsOpen={ 'open' === post.comment_status } />
		)
	},

	render() {
		return (
			<div className="card">
				<QueryPosts postSlug={ this.props.slug } />

				{ this.props.requesting ?
					<Placeholder type="post" /> :
					this.renderArticle()
				}

				{ ! this.props.requesting && this.renderComments() }
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	const slug = ownProps.params.slug || false;
	const postId = getPostIdFromSlug( state, slug );

	return {
		slug,
		postId,
		requesting: isRequestingPost( state, slug ),
		post: getPost( state, parseInt( postId ) )
	};
} )( SinglePost );
