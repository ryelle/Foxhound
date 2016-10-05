/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'data/state/selectors';

// Components
import PostList from './list';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

const Index = React.createClass( {
	render() {
		const posts = this.props.posts || [];
		const meta = {
			title: FoxhoundSettings.meta.title,
			description: FoxhoundSettings.meta.description,
			canonical: FoxhoundSettings.URL.base,
		};

		return (
			<div className="site-content">
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'home', 'blog' ] } />
				<QueryPosts query={ this.props.query } />
				{ this.props.loading ?
					<Placeholder type="posts" /> :
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
	query.paged = ownProps.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	if ( FoxhoundSettings.frontPage.page ) {
		path += 'page/' + FoxhoundSettings.frontPage.blog + '/';
	}

	const posts = getPostsForQuery( state, query );
	const requesting = isRequestingPostsForQuery( state, query );

	return {
		path,
		page: parseInt( query.paged ),
		query,
		posts,
		requesting,
		loading: requesting && ! posts,
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( Index );
