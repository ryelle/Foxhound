/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import { getPostIdFromSlug, isRequestingPost, getPost } from 'state/posts/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import PostMeta from './meta';
import Media from './image';
// import Comments from '../comments';

const SinglePost = React.createClass( {
	mixins: [ ContentMixin ],

	setTitle() {
		let post = this.state.data;
		if ( 'undefined' !== typeof post.title ) {
			document.title = `${post.title.rendered} — ${FoxhoundSettings.title}`;
		}
	},

	renderPlaceholder() {
		return (
			<div>
				<h1>REQUESTING......</h1>
			</div>
		);
	},

	renderArticle() {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		const classes = classNames( {
			entry: true
		} );
		const featuredMedia = this.getFeaturedMedia( post );

		return (
			<article id={ `post-${ post.id }` } className={ classes }>
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

	render() {
		// this.setTitle();
		return (
			<div className="card">
				<QueryPosts postSlug={ this.props.slug } />

				{ this.props.requesting ?
					this.renderPlaceholder() :
					this.renderArticle()
				}
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
