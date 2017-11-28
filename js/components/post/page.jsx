/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import classNames from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { getPageIdFromPath, isRequestingPage, getPage } from 'wordpress-query-page/lib/selectors';
import he from 'he';
import qs from 'qs';
import QueryPage from 'wordpress-query-page';

/**
 * Internal Dependencies
 */
import { getTitle, getContent, getFeaturedMedia } from 'utils/content';
import Media from './image';
import Comments from 'components/comments';
import Placeholder from 'components/placeholder';
import PostPreview from './preview';

class SinglePage extends React.Component {
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
				<BodyClass classes={ [ 'page', 'single', 'single-page' ] } />
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( post ) } />
				{ featuredMedia ? <Media media={ featuredMedia } parentClass="entry-image" /> : null }
				<div className="entry-meta" />
				<div className="entry-content" dangerouslySetInnerHTML={ getContent( post ) } />
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
				<QueryPage pagePath={ this.props.path } />

				{ this.props.loading ? <Placeholder type="page" /> : this.renderArticle() }

				{ ! this.props.loading && this.renderComments() }
			</div>
		);
	}
}

export default connect( ( state, { match, location, slug = false } ) => {
	let path = match.params[ 0 ] || slug;
	if ( '/' === path[ path.length - 1 ] ) {
		path = path.slice( 0, -1 );
	}

	const postId = getPageIdFromPath( state, path );
	const requesting = isRequestingPage( state, path );
	const post = getPage( state, parseInt( postId ) );

	const query = location.search;
	const previewId = qs.parse( query ).preview_id || null;

	return {
		previewId,
		path,
		postId,
		post,
		requesting,
		loading: requesting && ! post,
	};
} )( SinglePage );
