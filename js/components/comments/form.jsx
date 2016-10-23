/* global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isSubmittingCommentOnPost } from 'wordpress-query-comments/selectors';
import { submitComment } from 'wordpress-query-comments/state';

const CommentForm = React.createClass( {

	getInitialState() {
		return {
			errorMessage: false,
		};
	},

	onSubmit( event ) {
		event.preventDefault();
		event.persist(); // We need this for the callback after a comment is posted.
		let keys = [ 'author', 'author_id', 'email', 'url', 'comment', 'comment_post_ID', 'comment_parent' ];
		let rawValues = {};
		keys.map( function( key ) {
			if ( event.target[ key ] ) {
				rawValues[ key ] = event.target[ key ].value;
			}
		} );
		let values = {};

		values.author = rawValues.author_id;
		values.author_email = rawValues.email;
		values.author_name = rawValues.author;
		values.author_url = rawValues.url;
		values.content = rawValues.comment;
		values.post = rawValues.comment_post_ID;

		const submission = this.props.submitComment( values );
		submission.then( ( repsonse ) => {
			// No idea what happened.
			if ( ! repsonse ) {
				return;
			}
			// Clear the comment form
			event.target.comment.value = '';
			if ( repsonse.message && repsonse.message === 'Conflict' ) {
				// clear form, show duplicate message
				this.setState( { errorMessage: 'Duplicate comment detected; it looks as though you’ve already said that!' } );
				setTimeout( () => {
					this.setState( { errorMessage: false } );
				}, 5000 );
			}
		} );
	},

	renderAnonFields() {
		const fields = [];
		fields.push(
			<p className="comment-form-notes" key="0">
				<span id="email-notes">Your email address will not be published.</span>
			</p>
		);

		fields.push(
			<div className="comment-form-required" key="1">
				<div className="comment-form-field comment-form-author">
					<label htmlFor="author">Name</label>
					<input id="author" name="author" type="text" aria-required="true" required="required" />
					<input id="author_id" name="author_id" type="hidden" value={ FoxhoundSettings.user } />
				</div>
				<div className="comment-form-field comment-form-email">
					<label htmlFor="email">Email</label>
					<input id="email" name="email" type="email" aria-describedby="email-notes" aria-required="true" required="required" />
				</div>
			</div>
		);

		fields.push(
			<div className="comment-form-field comment-form-url" key="2">
				<label htmlFor="url">Website</label>
				<input id="url" name="url" type="url" />
			</div>
		);

		return fields;
	},

	renderLoggedInNotice() {
		return (
			<p className="comment-form-notes">
				<span id="email-notes">Logged in as { FoxhoundSettings.userDisplay }.</span>
			</p>
		);
	},

	render() {
		const errorMessage = this.state.errorMessage ? <p className='error'>{ this.state.errorMessage }</p> : null;

		return (
			<form onSubmit={ this.onSubmit }>
				{ FoxhoundSettings.user === '0' ? this.renderAnonFields() : this.renderLoggedInNotice() }

				{ errorMessage }
				<div className="comment-form-field comment-form-comment">
					<label htmlFor="comment">Comment</label>
					<textarea ref="content" id="comment" name="comment" aria-required="true" required="required" />
				</div>
				<div className="comment-form-submit form-submit">
					<input type="submit" name="submit" id="submit" className="submit"
						value="Post Comment" disabled={ this.props.isSubmitting } />
					<input type="hidden" name="comment_post_ID" id="comment_post_ID" value={ this.props.postId } />
					<input type="hidden" name="comment_parent" id="comment_parent" defaultValue={ 0 } />
				</div>
			</form>
		);
	}
} );

export default connect(
	( state, ownProps ) => ( {
		isSubmitting: isSubmittingCommentOnPost( state, ownProps.postId )
	} ),
	( dispatch ) => ( bindActionCreators( { submitComment }, dispatch ) )
)( CommentForm );
