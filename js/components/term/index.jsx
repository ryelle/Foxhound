import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'wordpress-query-components/queryPosts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'wordpress-query-components/selectors';

// Components
import TermHeader from './header';
import PostList from '../posts/list';
import Pagination from '../pagination/archive';

const Term = React.createClass( {
	renderHeaderPlaceholder() {
		return null;
	},

	renderPlaceholder() {
		return null;
	},

	render() {
		const posts = this.props.posts || [];

		return (
			<div className="card">
				<TermHeader params={ { taxonomy: this.props.route.taxonomy, slug: this.props.params.slug } } />

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

	return {
		query,
		page: parseInt( query.paged ),
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query ),
	};
} )( Term );
