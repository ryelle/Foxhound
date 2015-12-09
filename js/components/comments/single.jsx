// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import ContentMixin from 'utils/content-mixin';

let Comment = React.createClass( {
	mixins: [ ContentMixin ],

	render: function() {
		let comment = this.props.comment;
		let classes = 'comment byuser comment-author-melchoyce even thread-even depth-1';

		return (
			<li className={ classes }>
				<article className="comment-body" dangerouslySetInnerHTML={ this.getContent( comment ) } />
			</li>
		);
	}
} );

export default Comment;
