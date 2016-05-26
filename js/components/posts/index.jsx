/* global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery } from 'state/posts/selectors';

// Components
import PostList from './list';
// import Pagination from '../pagination/archive';

const Index = React.createClass( {
	setTitle() {
		document.title = FoxhoundSettings.title;
	},

	renderPlaceholder() {
		return (
			<div className="placeholder">Your posts are loading…</div>
		);
	},

	render() {
		let posts = this.props.posts;
		this.setTitle();

		return (
			<div className="site-content">
				<QueryPosts query={ this.props.query } />
				{ this.props.requesting ?
					this.renderPlaceholder() :
					<PostList posts={ posts } />
				}
				<Pagination current={ this.props.page } end={ this.props.totalPages } />
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	return {
		query: ownProps.query,
		posts: getPostsForQuery( state, ownProps.query ),
		requesting: isRequestingPostsForQuery( state, ownProps.query )
	};
} )( Index );
