/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';

// Internal dependencies
import QueryPosts from 'wordpress-query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'wordpress-query-posts/selectors';

// Components
import PostList from 'components/posts/list';
import SearchForm from './form';
import Placeholder from 'components/placeholder';

const Search = React.createClass( {
	search( event ) {
		event.preventDefault();
		const url = `${ FoxhoundSettings.URL.path }search/${ this.getSearchValue() }`;
		this.props.router.push( url );
	},

	getSearchValue() {
		if ( 'undefined' !== typeof this.refs.searchForm ) {
			return this.refs.searchForm.getValue();
		}
		return this.props.params.search;
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
				<BodyClass classes={ [ 'search' ] } />
				<header className="page-header">
					<h1 className="page-title">Search results for &ldquo;{ term }&rdquo;</h1>
					<SearchForm ref='searchForm' initialSearch={ term } onSubmit={ this.search } />
				</header>

				<QueryPosts query={ this.props.query } />
				{ this.props.loading ?
					<Placeholder type="search" /> :
					<PostList posts={ posts } />
				}
			</div>
		);
	}
} );

export default withRouter( connect( ( state, ownProps ) => {
	let query = {};
	query.paged = ownProps.params.paged || 1;
	query.s = ownProps.params.search || '';
	const posts = getPostsForQuery( state, query );
	const requesting = isRequestingPostsForQuery( state, query );

	return {
		page: parseInt( query.paged ),
		query,
		posts,
		requesting,
		loading: requesting && ! posts,
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( Search ) );
