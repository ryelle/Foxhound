/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Internal dependencies
import QueryPage from 'wordpress-query-components/queryPage';
import { getPageIdFromPath, isRequestingPage, getPage } from 'wordpress-query-components/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
import Media from './image';
import Comments from 'components/comments';

const SinglePage = React.createClass( {
	mixins: [ ContentMixin ],

	renderPlaceholder() {
		return (
			<article className="entry entry-placeholder">
				<h1 className="entry-title">Loading</h1>
				<div className="entry-content"><br /><br /></div>
			</article>
		);
	},

	renderArticle() {
		const post = this.props.post;
		if ( ! post ) {
			return null;
		}

		document.title = post.title.rendered + ' – ' + FoxhoundSettings.title;

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
				postId={ this.props.postId }
				title={ <span dangerouslySetInnerHTML={ this.getTitle( post ) } /> }
				commentsOpen={ 'open' === post.comment_status } />
		)
	},

	render() {
		return (
			<div className="card">
				<QueryPage pagePath={ this.props.path } />

				{ this.props.requesting ?
					this.renderPlaceholder() :
					this.renderArticle()
				}

				{ ! this.props.requesting && this.renderComments() }
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	const path = ownProps.params.splat || false;
	const postId = getPageIdFromPath( state, path );

	return {
		path,
		postId,
		requesting: isRequestingPage( state, path ),
		post: getPage( state, parseInt( postId ) )
	};
} )( SinglePage );
