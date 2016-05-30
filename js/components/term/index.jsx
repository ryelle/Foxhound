import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import QueryTerm from 'components/data/query-term';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'state/posts/selectors';
import { isRequestingTerm, getTermIdFromSlug, getTerm } from 'state/terms/selectors';

// Components
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
		const termData = this.props.termData || {};

		return (
			<div className="card">
				<QueryTerm taxonomy={ this.props.taxonomy } termSlug={ this.props.term } />
				{ this.props.requestingTerm ?
					this.renderHeaderPlaceholder() :
					<header className="page-header">
						<h1 className="page-title">{ termData.name }</h1>
						{ termData.description && <p>{ termData.description }</p> }
					</header>
				}

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

	const term = ownProps.params.slug;
	const taxonomy = ownProps.route.taxonomy;
	const termId = getTermIdFromSlug( state, taxonomy, term );

	return {
		term,
		taxonomy,
		query,
		termData: getTerm( state, termId ),
		page: parseInt( query.paged ),
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query ),
		requestingTerm: isRequestingTerm( state, taxonomy, term )
	};
} )( Term );
