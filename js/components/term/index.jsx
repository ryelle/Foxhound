/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import BodyClass from 'react-body-class';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { getTerm, getTermIdFromSlug, isRequestingTerm } from 'wordpress-query-term/lib/selectors';
import he from 'he';
import QueryTerm from 'wordpress-query-term';
import stripTags from 'striptags';

/**
 * Internal Dependencies
 */
import List from './list';
import Placeholder from 'components/placeholder';

const TermHeader = ( { term, taxonomy, loading, termData = {}, query = {} } ) => {
	const meta = {
		title: he.decode( `${ termData.name } – ${ FoxhoundSettings.meta.title }` ),
		description: he.decode( stripTags( termData.description ) ),
	};

	return (
		<div className="card">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'archive', taxonomy ] } />
			<QueryTerm taxonomy={ taxonomy } termSlug={ term } />
			{ loading ? (
				<Placeholder type="term" />
			) : (
				<div>
					<header className="page-header">
						<h1 className="page-title">{ termData.name }</h1>
						{ termData.description && <p>{ termData.description }</p> }
					</header>
					<List query={ query } taxonomy={ taxonomy } term={ termData && termData.id } />
				</div>
			) }
		</div>
	);
};

export default connect( ( state, { match, taxonomy } ) => {
	const term = match.params.slug;
	const termId = getTermIdFromSlug( state, taxonomy, term );
	const termData = getTerm( state, termId );
	const requesting = isRequestingTerm( state, taxonomy, term );

	const query = {};
	query.page = match.params.paged || 1;
	if ( termId ) {
		if ( 'category' === taxonomy ) {
			query.categories = [ termId ];
		} else {
			query.tags = [ termId ];
		}
	}

	return {
		term,
		taxonomy,
		termData,
		requesting,
		query,
		loading: requesting && ! termData,
	};
} )( TermHeader );
