// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import ContentMixin from 'utils/content-mixin';

let Post = React.createClass( {
	mixins: [ ContentMixin ],

	render: function() {
		let post = this.props;

		let classes = classNames( {
			'entry': true
		} );

		return (
			<li id={ "post-" + this.props.id } className={ classes }>
				<h2 className="entry-title">
					<a href={ this.props.link } rel="bookmark" dangerouslySetInnerHTML={ this.getTitle( this.props ) } />
				</h2>
			</li>
		);
	}
} );

export default Post;
