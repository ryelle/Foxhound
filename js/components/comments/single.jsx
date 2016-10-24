// External dependencies
import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import ContentMixin from 'utils/content-mixin';
import { getComment } from 'wordpress-query-comments/lib/selectors';

const Comment = React.createClass( {
	mixins: [ ContentMixin ],

	render() {
		const comment = this.props.comment;
		const classes = 'comment'; // byuser comment-author-melchoyce even thread-even depth-1

		let replyParentString = null;
		if ( this.props.parent ) {
			replyParentString = (
				<span>In reply to { this.props.parent.author_name }&nbsp;&bull;&nbsp;</span>
			);
		}

		return (
			<li className={ classes }>
				<article className="comment-body">
					<footer className="comment-meta">
						<div className="comment-avatar vcard">
							<img alt="" src={ comment.author_avatar_urls['96'] } />
						</div>

						<div className="comment-author">
						{ ( '' !== comment.author_url ) ?
							<a href={ comment.author_url } className="fn">{ comment.author_name }</a> :
							<span className="fn">{ comment.author_name }</span>
						}
						</div>

						<div className="comment-metadata">
							{ replyParentString }
							<time dateTime={ comment.date }>{ this.getDate( comment ) } at { this.getTime( comment ) }</time>
						</div>
					</footer>

					<div className="comment-content" dangerouslySetInnerHTML={ this.getContent( comment ) } />

					{ ( 'hold' === comment.status ) ?
						<div className="comment-status">
							Your comment is pending approval
						</div> :
						null
					}

				</article>
			</li>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	const commentParent = ownProps.comment.parent || false;

	return {
		parent: commentParent ? getComment( state, commentParent ) : false,
	};
} )( Comment );
