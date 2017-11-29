/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {
	getPostsForQuery,
	getTotalPagesForQuery,
	isRequestingPostsForQuery,
} from 'wordpress-query-posts/lib/selectors';
import he from 'he';
import QueryPosts from 'wordpress-query-posts';
import { withRouter } from 'react-router';

/**
 * Internal Dependencies
 */
import Placeholder from 'components/placeholder';
import PostList from 'components/posts/list';
import SearchForm from './form';

class Search extends React.Component {
	setSearchForm = form => {
		this.searchForm = form;
	};

	search = event => {
		event.preventDefault();
		const url = `${ FoxhoundSettings.URL.path }search/${ this.getSearchValue() }`;
		this.props.history.push( url );
	};

	getSearchValue = () => {
		if ( 'undefined' !== typeof this.searchForm ) {
			return this.searchForm.getValue();
		}
		return this.props.match.params.search.replace( /\+/g, ' ' );
	};

	render() {
		const posts = this.props.posts;
		const term = this.getSearchValue();
		const meta = {
			title: he.decode( `Search Results for "${ term }" – ${ FoxhoundSettings.meta.title }` ),
		};

		return (
			<div className="site-content">
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'search' ] } />
				<header className="page-header">
					<h1 className="page-title">Search results for &ldquo;{ term }&rdquo;</h1>
					<SearchForm ref={ this.setSearchForm } initialSearch={ term } onSubmit={ this.search } />
				</header>

				<QueryPosts query={ this.props.query } />
				{ this.props.loading ? (
					<Placeholder type="search" />
				) : (
					<PostList
						posts={ posts }
						error={
							'Sorry, but nothing matched your search terms. Please try again with some different keywords.'
						}
					/>
				) }
			</div>
		);
	}
}

export default withRouter(
	connect( ( state, { match } ) => {
		const query = {};
		query.page = match.params.paged || 1;
		query.search = match.params.search.replace( /\+/g, ' ' ) || '';
		const posts = getPostsForQuery( state, query ) || [];
		const requesting = isRequestingPostsForQuery( state, query );

		return {
			page: parseInt( query.page ),
			query,
			posts,
			requesting,
			loading: requesting && ! posts.length,
			totalPages: getTotalPagesForQuery( state, query ),
		};
	} )( Search )
);
