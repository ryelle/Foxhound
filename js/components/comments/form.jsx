// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import CommentsStore from '../../stores/comments-store';

let CommentForm = React.createClass( {
	render: function() {
		return (
			<form>
				<p className="comment-form-notes">
					<span id="email-notes">Your email address will not be published.</span>
				</p>
				<div className="comment-form-required">
					<div className="comment-form-field comment-form-author">
						<label htmlFor="author">Name</label>
						<input id="author" name="author" type="text" aria-required="true" required="required" />
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
					<textarea id="comment" name="comment" aria-required="true" required="required" />
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
