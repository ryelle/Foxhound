/*global FoxhoundSettings */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

// Internal dependencies
import QueryPosts from 'wordpress-query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'wordpress-query-posts/lib/selectors';

// Components
import PostList from 'components/posts/list';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

class AuthorArchive extends Component {
	shouldComponentUpdate( nextProps ) {
		const newQuery = ! isEqual( nextProps.query, this.props.query );
		const newPosts = ! isEqual( nextProps.posts, this.props.posts );
		return newQuery || newPosts;
	}

	render() {
		const { query, posts, loading, path, page, totalPages } = this.props;
		return (
			<div>
				<QueryPosts query={ query || {} } />
				{ loading ?
					<Placeholder type="author" /> :
					<PostList posts={ posts } />
				}

				<Pagination
					path={ path }
					current={ page }
					isFirstPage={ 1 === page }
					isLastPage={ totalPages === page } />
			</div>
		);
	}
};

export default connect( ( state, ownProps ) => {
	const { query, author } = ownProps;
	let path = FoxhoundSettings.URL.path || '/';
	path += `author/${ author }/`;

	// Needs to be below query setup
	const requesting = isRequestingPostsForQuery( state, query );
	const posts = getPostsForQuery( state, query ) || [];

	return {
		path,
		query,
		posts,
		requesting,
		loading: requesting && ! posts,
		page: parseInt( query.page ),
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( AuthorArchive );
