// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

// Redux dependencies
import QueryPosts from 'wordpress-query-posts';
import { isRequestingPostsForQuery, getPostsForQuery } from 'wordpress-query-posts/lib/selectors';

// Components
import PostList from './list';

const StickyPostsList = React.createClass( {
	shouldComponentUpdate( nextProps ) {
		return ! isEqual( nextProps.posts, this.props.posts );
	},

	render() {
		const posts = this.props.posts;

		return (
			<div className="sticky-container">
				<QueryPosts query={ this.props.query } />
				<PostList posts={ posts } />
			</div>
		);
	}
} );

export default connect( ( state ) => {
	const query = {};
	query.page = 1;
	query.per_page = 2;
	query.sticky = true;

	const posts = getPostsForQuery( state, query ) || [];
	const requesting = isRequestingPostsForQuery( state, query );

	return {
		query,
		posts,
		requesting,
		loading: requesting && ! posts,
	};
} )( StickyPostsList );
