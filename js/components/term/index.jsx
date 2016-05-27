/* global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'state/posts/selectors';

// Components
import PostList from '../posts/list';
import Pagination from '../pagination/archive';

const Term = React.createClass( {
	renderPlaceholder() {
		return null;
	},

	render() {
		// let term = this.props.term;
		let posts = this.props.posts;

		// <QueryTerm slug={ this.props.term } />
		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">A Category</h1>
				</header>

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
	if ( 'category' === ownProps.route.taxonomy ) {
		query.category_name = ownProps.params.slug;
	} else {
		query.tag = ownProps.params.slug;
	}
	console.log( query );

	return {
		page: parseInt( query.paged ),
		query: query,
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query )
	};
} )( Term );
