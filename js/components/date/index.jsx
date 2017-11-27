/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import moment from 'moment';
import he from 'he';
import QueryPosts from 'wordpress-query-posts';
import {
	isRequestingPostsForQuery,
	getPostsForQuery,
	getTotalPagesForQuery,
} from 'wordpress-query-posts/lib/selectors';

/**
 * Internal Dependencies
 */
import PostList from 'components/posts/list';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

function DateArchive( props ) {
	const { query, loading, path, page, totalPages, dateString, posts } = props;
	const meta = {
		title: dateString + ' – ' + he.decode( FoxhoundSettings.meta.title ),
	};

	return (
		<div className="card">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'archive', 'date' ] } />
			<header className="page-header">
				<h1 className="page-title">Archive for { dateString }</h1>
			</header>
			<QueryPosts query={ query } />
			{ loading ? <Placeholder type="date" /> : <PostList posts={ posts } /> }

			<Pagination
				path={ path }
				current={ page }
				isFirstPage={ 1 === page }
				isLastPage={ totalPages === page }
			/>
		</div>
	);
}

export default connect( ( state, { match } ) => {
	let path = FoxhoundSettings.URL.path || '/';
	path += 'date/';
	for ( const key in [ 'year', 'month', 'day' ] ) {
		if ( match.params.hasOwnProperty( key ) ) {
			path += match.params[ key ] + '/';
		}
	}

	const { day, month, year } = match.params;
	let date, dateString;
	const query = {};
	query.page = match.params.paged || 1;
	if ( day ) {
		date = moment( `${ year } ${ month } ${ day }`, 'YYYY MM DD' );
		dateString = date.format( 'MMMM Do YYYY' );
		query.after = date.format();
		query.before = date.add( 1, 'day' ).format();
	} else if ( month ) {
		date = moment( `${ year } ${ month }`, 'YYYY MM' );
		dateString = date.format( 'MMMM YYYY' );
		query.after = date.format();
		query.before = date.add( 1, 'month' ).format();
	} else {
		date = moment( `${ year }`, 'YYYY' );
		dateString = date.format( 'YYYY' );
		query.after = date.format();
		query.before = date.add( 1, 'year' ).format();
	}

	query.after = encodeURIComponent( query.after );
	query.before = encodeURIComponent( query.before );

	const posts = getPostsForQuery( state, query ) || [];
	const requesting = isRequestingPostsForQuery( state, query );

	return {
		path,
		query,
		posts,
		requesting,
		dateString,
		loading: requesting && ! posts.length,
		page: parseInt( query.page ),
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( DateArchive );
