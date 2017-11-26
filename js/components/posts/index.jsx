/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
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
import PostList from './list';
import StickyPostsList from './sticky';
import PostPreview from 'components/post/preview';
import Pagination from 'components/pagination/archive';
import Placeholder from 'components/placeholder';

function Index( props ) {
	if ( !! props.previewId ) {
		return <PostPreview id={ props.previewId } />;
	}

	const posts = props.posts;
	const meta = {
		title: he.decode( FoxhoundSettings.meta.title ),
		description: FoxhoundSettings.meta.description,
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

export default connect( ( state, ownProps ) => {
	const query = {};
	query.sticky = false;
	query.page = ownProps.params.paged || 1;

	let path = FoxhoundSettings.URL.path || '/';
	if ( FoxhoundSettings.frontPage.page ) {
		path += 'page/' + FoxhoundSettings.frontPage.blog + '/';
	}

	const posts = getPostsForQuery( state, query ) || [];
	const requesting = isRequestingPostsForQuery( state, query );
	const previewId = ownProps.location.query.p || ownProps.location.query.page_id;

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
