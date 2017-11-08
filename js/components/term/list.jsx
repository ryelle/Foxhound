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

class Term extends Component {
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
					<Placeholder type="term" /> :
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
}

export default connect( ( state, ownProps ) => {
	const { query, taxonomy, term } = ownProps;
	let path = FoxhoundSettings.URL.path || '/';
	path += ( 'category' === taxonomy ) ? `category/${ term }/` : `tag/${ term }/`;

	// Needs to be below query setup
	const requesting = isRequestingPostsForQuery( state, query );
	const posts = getPostsForQuery( state, query ) || [];

	return {
		path,
		query,
		posts,
		requesting,
		loading: requesting && ! posts.length,
		page: parseInt( query.page, 10 ),
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( Term );
