// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import BodyClass from 'react-body-class';

// Internal dependencies
import QueryComments from 'data/query-comments';
import { isRequestingCommentsForPost, getCommentsForPost, getTotalCommentsForPost } from 'data/state/selectors';

// Components
// import CommentPagination from '../pagination/comments';
import Comment from './single';
import CommentForm from './form';

const Comments = React.createClass( {
	renderForm() {
		return (
			<div className="comment-respond">
				<h3 className="comment-reply-title">Leave a Reply</h3>

				<CommentForm postId={ this.props.postId } />
			</div>
		);
	},

	renderPlaceholder() {
		return (
			<div className="comments-area" ref="comments">
				{ this.props.commentsOpen && this.renderForm() }
			</div>
		);
	},

	render() {
		const comments = this.props.comments;
		let commentsList = null;
		if ( comments && comments.length ) {
			commentsList = comments.map( function( item, i ) {
				return <Comment key={ i } comment={ item } />
			} );
		}

		let titleString = 'One comment on ';
		if ( this.props.total > 1 ) {
			titleString = `${ this.props.total } comments on `;
		}

		return (
			<div className="comments-area" ref="comments">
				<QueryComments postId={ this.props.postId } />
				<BodyClass classes={ { 'has-comments': !! this.props.total } } />
				{ ( 0 === this.props.total ) ?
					null :
					<h2 className="comments-title">{ titleString }&ldquo;{ this.props.title }&rdquo;</h2>
				}

				<ol className="comment-list">
					{ ! this.props.requesting && commentsList }
				</ol>

				{ this.props.commentsOpen && this.renderForm() }
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	const postId = ownProps.postId;

	return {
		postId,
		comments: getCommentsForPost( state, postId ),
		total: getTotalCommentsForPost( state, postId ),
		requesting: isRequestingCommentsForPost( state, postId )
	};
} )( Comments );
