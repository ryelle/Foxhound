/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'data/state/selectors';

// Components
import TermHeader from './header';
import PostList from 'components/posts/list';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

const Term = React.createClass( {
	renderHeaderPlaceholder() {
		return null;
	},

	render() {
		const posts = this.props.posts || [];

		return (
			<div className="card">
				<TermHeader params={ { taxonomy: this.props.route.taxonomy, slug: this.props.params.slug } } />

				<QueryPosts query={ this.props.query } />
				{ this.props.loading ?
					<Placeholder type="term" /> :
					<PostList posts={ posts } />
				}

				<Pagination
					path={ this.props.path }
					current={ this.props.page }
					isFirstPage={ 1 === this.props.page }
					isLastPage={ this.props.totalPages === this.props.page } />
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	let query = {};
	let path = FoxhoundSettings.URL.path || '/';
	query.paged = ownProps.params.paged || 1;
	if ( 'category' === ownProps.route.taxonomy ) {
		query.category_name = ownProps.params.slug;
		path += 'category/' + ownProps.params.slug + '/';
	} else {
		query.tag = ownProps.params.slug;
		path += 'tag/' + ownProps.params.slug + '/';
	}

	const posts = getPostsForQuery( state, query );
	const requesting = isRequestingPostsForQuery( state, query );

	return {
		path,
		query,
		posts,
		requesting,
		loading: requesting && ! posts,
		page: parseInt( query.paged ),
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( Term );
