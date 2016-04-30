// External dependencies
import React from 'react';

// Internal dependencies
import API from 'utils/api';
import CommentsStore from '../../stores/comments-store';

import CommentPagination from '../pagination/comments';
import Comment from './single';
import CommentForm from './form';

/*
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: CommentsStore.getComments(),
		total: CommentsStore.getTotal(),
		pagination: CommentsStore.getPaginationLimit(),
	};
}

let Comments = React.createClass( {
	propTypes: {
		postId: React.PropTypes.number.isRequired,
		commentsOpen: React.PropTypes.bool,
		title: React.PropTypes.element
	},

	getInitialState: function() {
		let state = getState();
		state.page = 1;
		return state;
	},

	componentDidMount: function() {
		CommentsStore.addChangeListener( this._onChange );
		API.getComments( this.props.postId, { page: this.state.page } );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( ( prevProps.postId !== this.props.postId ) || ( prevState.page !== this.state.page ) ) {
			API.getComments( this.props.postId, { page: this.state.page } );
		}
	},

	componentWillUnmount: function() {
		CommentsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		let state = getState();
		this.setState( {
			data: state.data,
			pagination: state.pagination,
			total: state.total
		} );
	},

	onNextPage: function( event ) {
		event.preventDefault();
		window.scrollTo( 0, this.refs.comments.offsetTop );
		this.setState( { page: this.state.page + 1 } );
	},

	onPreviousPage: function( event ) {
		event.preventDefault();
		window.scrollTo( 0, this.refs.comments.offsetTop );
		this.setState( { page: this.state.page - 1 } );
	},

	renderForm: function() {
		return (
			<div className="comment-respond">
				<h3 className="comment-reply-title">Leave a Reply</h3>

				<CommentForm postId={ this.props.postId } />
			</div>
		);
	},

	renderPlaceholder: function() {
		return (
			<div className="comments-area" ref="comments">
				{ this.props.commentsOpen && this.renderForm() }
			</div>
		);
	},

	render: function() {
		let comments = this.state.data;
		if ( ! comments.length ) {
			return this.renderPlaceholder();
		}

		comments = comments.map( function( item, i ) {
			return <Comment key={ i } comment={ item } />
		} );

		let titleString = `One comment on `;
		if ( this.state.total > 1 ) {
			titleString = `${ this.state.total } comments on `;
		}

		return (
			<div className="comments-area" ref="comments">
				<h2 className="comments-title">{ titleString }&ldquo;{ this.props.title }&rdquo;</h2>

				<ol className="comment-list">
					{ comments }
				</ol>

				<CommentPagination end={ this.state.pagination } current={ this.state.page } onNextPage={ this.onNextPage } onPreviousPage={ this.onPreviousPage } />

				{ this.props.commentsOpen && this.renderForm() }
			</div>
		);
	}
} );

export default Comments;
