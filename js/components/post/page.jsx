/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Internal dependencies
import QueryPage from 'components/data/query-page';
import { getPageIdFromPath, isRequestingPage, getPage } from 'state/pages/selectors';
import ContentMixin from 'utils/content-mixin';

// Components
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
			</article>
		);
	},

	render() {
		// this.setTitle();
		return (
			<div className="card">
				<QueryPage pagePath={ this.props.path } />

				{ this.props.requesting ?
					this.renderPlaceholder() :
					this.renderArticle()
				}
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
} )( SinglePost );
