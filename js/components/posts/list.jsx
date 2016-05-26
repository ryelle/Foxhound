// External dependencies
import React from 'react';

// Internal dependencies
import Post from './single';

const PostList = React.createClass( {
	propTypes: {
		posts: React.PropTypes.array.isRequired,
	},

	render: function() {
		if ( ! this.props.posts ) {
			return null;
		}

		const posts = this.props.posts.map( ( post, i ) => {
			return <Post key={ 'post-' + i } { ...post } />
		} );

		return (
			<div className="site-main">
				{ posts }
			</div>
		);
	}
} );

export default PostList;
