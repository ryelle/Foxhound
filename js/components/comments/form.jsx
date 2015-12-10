// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import CommentsStore from '../../stores/comments-store';

let CommentForm = React.createClass( {

	onSubmit: function( event ){
		event.preventDefault();
		let keys = [ 'author', 'author_id', 'email', 'url', 'comment', 'comment_post_ID', 'comment_parent' ];
		let rawValues = {};
		keys.map( function( key ) {
			rawValues[ key ] = event.target[ key ].value;
		} );
		let values = {};

		values.author = rawValues.author_id;
		values.author_email = rawValues.email;
		values.author_name = rawValues.author;
		values.author_url = rawValues.url;
		values.content = rawValues.comment;
		values.post = rawValues.comment_post_ID;

		API.sendComment( values, () => {
			this.refs.content.value = '';
		} );
	},

	render: function() {
		return (
			<form onSubmit={ this.onSubmit }>
				<p className="comment-form-notes">
					<span id="email-notes">Your email address will not be published.</span>
				</p>
				<div className="comment-form-required">
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
				<div className="comment-form-field comment-form-url">
					<label htmlFor="url">Website</label>
					<input id="url" name="url" type="url" />
				</div>
				<div className="comment-form-field comment-form-comment">
					<label htmlFor="comment">Comment</label>
					<textarea ref="content" id="comment" name="comment" aria-required="true" required="required" />
				</div>
				<div className="comment-form-submit form-submit">
					<input name="submit" type="submit" id="submit" className="submit" value="Post Comment" />
					<input type="hidden" name="comment_post_ID" value={ this.props.postId } id="comment_post_ID" />
					<input type="hidden" name="comment_parent" id="comment_parent" defaultValue={ 0 } />
				</div>
			</form>
		);
	}
} );

export default CommentForm;
