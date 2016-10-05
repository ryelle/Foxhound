/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import moment from 'moment';

// Internal dependencies
import QueryPosts from 'data/query-posts';
import { isRequestingPostsForQuery, getPostsForQuery, getTotalPagesForQuery } from 'data/state/selectors';

// Components
import PostList from 'components/posts/list';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

const DateArchive = React.createClass( {
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

		const meta = {
			title: dateString + ' – ' + FoxhoundSettings.meta.title,
		};

		return (
			<div className="card">
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'archive', 'date' ] } />
				<header className="page-header">
					<h1 className="page-title">Archive for { dateString }</h1>
				</header>
				<QueryPosts query={ this.props.query } />
				{ this.props.loading ?
					<Placeholder type="date" /> :
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
	if ( ownProps.params.year ) {
		query.year = parseInt( ownProps.params.year );
	}
	if ( ownProps.params.month ) {
		query.monthnum = parseInt( ownProps.params.month );
	}
	if ( ownProps.params.day ) {
		query.day = parseInt( ownProps.params.day );
	}
	let path = FoxhoundSettings.URL.path || '/';
	path += 'date/';
	[ 'year', 'monthnum', 'day' ].map( ( key ) => {
		if ( query.hasOwnProperty( key ) ) {
			path += query[ key ] + '/';
		}
	} );

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
} )( DateArchive );
