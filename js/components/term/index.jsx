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
				{ this.props.requesting ?
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

	return {
		path,
		query,
		page: parseInt( query.paged ),
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query ),
	};
} )( Term );
