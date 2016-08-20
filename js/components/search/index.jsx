/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'data/state/selectors';

// Components
import PostList from '../posts/list';
import SearchForm from './form';

const Search = React.createClass( {
	search( event ) {
		event.preventDefault();
		// this.context.router.transitionTo( `/search/${ this.getSearchValue() }` );
	},

	getSearchValue() {
		if ( 'undefined' !== typeof this.refs.searchForm ) {
			return this.refs.searchForm.getValue();
		}
		return this.props.params.search;
	},

	renderPlaceholder() {
		return null;
	},

	render() {
		const posts = this.props.posts || [];
		const term = this.getSearchValue();
		const meta = {
			title: 'Search Results for "' + term + '" – ' + FoxhoundSettings.meta.title,
		};

		return (
			<div className='site-content'>
				<DocumentMeta { ...meta } />
				<header className="page-header">
					<h1 className="page-title">Search results for &ldquo;{ term }&rdquo;</h1>
					<SearchForm ref='searchForm' initialSearch={ term } onChange={ this.search } />
				</header>

				<QueryPosts query={ this.props.query } />
				{ this.props.requesting ?
					this.renderPlaceholder() :
					<PostList posts={ posts } />
				}
			</div>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	let query = {};
	query.paged = ownProps.params.paged || 1;
	query.s = ownProps.params.search || '';

	return {
		page: parseInt( query.paged ),
		query: query,
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query )
	};
} )( Search );
