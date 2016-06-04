// External dependencies
import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'state/posts/selectors';

// Components
import PostList from './list';
import Pagination from '../pagination/archive';

const Index = React.createClass( {
	renderPlaceholder() {
		return (
			<div className="placeholder">Your posts are loading…</div>
		);
	},

	render() {
		let posts = this.props.posts || [];

		return (
			<div className="site-content">
				<QueryPosts query={ this.props.query } />
				{ this.props.requesting ?
					this.renderPlaceholder() :
					<PostList posts={ posts } />
				}
				<Pagination current={ this.props.page } isFirstPage={ 1 === this.props.page } isLastPage={ this.props.totalPages === this.props.page } />
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	let query = {};
	query.paged = ownProps.params.paged || 1;

	return {
		page: parseInt( query.paged ),
		query: query,
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query )
	};
} )( Index );
