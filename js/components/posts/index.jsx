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
import qs from 'qs';
import QueryPosts from 'wordpress-query-posts';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';
import PostList from './list';
import PostPreview from 'components/post/preview';
import StickyPostsList from './sticky';

function Index( props ) {
	if ( !! props.previewId ) {
		return <PostPreview id={ props.previewId } />;
	}

	const posts = props.posts;
	const meta = {
		title: he.decode( FoxhoundSettings.meta.title ),
		description: he.decode( stripTags( FoxhoundSettings.meta.description ) ),
		canonical: FoxhoundSettings.URL.base,
	};

	return (
		<div className="site-content">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'home', 'blog' ] } />
			<StickyPostsList />
			<QueryPosts query={ props.query } />
			{ props.loading ? <Placeholder type="posts" /> : <PostList posts={ posts } /> }
			<Pagination
				path={ props.path }
				current={ props.page }
				isFirstPage={ 1 === props.page }
				isLastPage={ props.totalPages === props.page }
			/>
		</div>
	);
}

export default connect( ( state, { match, location } ) => {
	const query = {};
	query.sticky = false;
	query.page = match.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	if ( FoxhoundSettings.frontPage.page ) {
		path += 'page/' + FoxhoundSettings.frontPage.blog + '/';
	}

	const posts = getPostsForQuery( state, query ) || [];
	const requesting = isRequestingPostsForQuery( state, query );

	const urlQuery = qs.parse( location.search );
	const previewId = urlQuery.p || urlQuery.page_id || null;

	return {
		previewId,
		path,
		page: parseInt( query.page ),
		query,
		posts,
		requesting,
		loading: requesting && ! posts.length,
		totalPages: getTotalPagesForQuery( state, query ),
	};
} )( Index );
