import React from 'react';
import { connect } from 'react-redux';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'data/state/selectors';

// Components
import PostList from '../posts/list';
import Pagination from '../pagination/archive';
import moment from 'moment';

const DateArchive = React.createClass( {
	renderPlaceholder() {
		return null;
	},

	render() {
		const posts = this.props.posts || [];
		const dateObj = this.props.params;

		let date, dateString;
		if ( dateObj.day ) {
			date = moment( `${ dateObj.year } ${ dateObj.month } ${ dateObj.day }`, 'YYYY MM DD' );
			dateString = date.format( 'MMMM Do YYYY' );
		} else if ( dateObj.month ) {
			date = moment( `${ dateObj.year } ${ dateObj.month }`, 'YYYY MM' );
			dateString = date.format( 'MMMM YYYY' );
		} else {
			date = moment( `${ dateObj.year }`, 'YYYY' );
			dateString = date.format( 'YYYY' );
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">Archive for { dateString }</h1>
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
	if ( ownProps.params.year ) {
		query.year = parseInt( ownProps.params.year );
	}
	if ( ownProps.params.month ) {
		query.monthnum = parseInt( ownProps.params.month );
	}
	if ( ownProps.params.day ) {
		query.day = parseInt( ownProps.params.day );
	}

	return {
		page: parseInt( query.paged ),
		query: query,
		posts: getPostsForQuery( state, query ),
		totalPages: getTotalPagesForQuery( state, query ),
		requesting: isRequestingPostsForQuery( state, query )
	};
} )( DateArchive );
