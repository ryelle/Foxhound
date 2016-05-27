import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'components/data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'state/posts/selectors';

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
		let term = this.getSearchValue();

		return (
			<div className='site-content'>
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
	console.log( ownProps );
	let query = {};
	query.paged = ownProps.params.paged || 1;
	query.s = ownProps.params.search || '';
	console.log( query );

	return {
		page: parseInt( query.paged ),
		query: query,
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query )
	};
} )( Search );
