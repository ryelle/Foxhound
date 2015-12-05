// External dependencies
import React from 'react';

// Internal dependencies
import Post from './single';

let PostList = React.createClass( {
	propTypes: {
		posts: React.PropTypes.array.isRequired,
	},

	render: function() {
		let posts = this.props.posts.map( function( post, i ) {
			return <Post key={ 'post-' + i } { ...post } />
		} );

		return (
			<ol className="site-main">
				{ posts }
			</ol>
		);
	}
} );

export default PostList;
