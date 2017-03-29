/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import QueryTerm from 'wordpress-query-term';
import { isRequestingTerm, getTermIdFromSlug, getTerm } from 'wordpress-query-term/lib/selectors';
import Placeholder from 'components/placeholder';
import List from './list';

const TermHeader = ( { term, taxonomy, loading, termData = {}, query = {} } ) => {
	const meta = {
		title: termData.name + ' – ' + FoxhoundSettings.meta.title,
		description: termData.description,
	};
	meta.title = he.decode( meta.title );

	return (
		<div className="card">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'archive', taxonomy ] } />
			<QueryTerm taxonomy={ taxonomy } termSlug={ term } />
			{ loading ?
				<Placeholder type="term" /> :
				<div>
					<header className="page-header">
						<h1 className="page-title">{ termData.name }</h1>
						{ termData.description && <p>{ termData.description }</p> }
					</header>
					<List query={ query } taxonomy={ taxonomy } term={ termData && termData.id } />
				</div>
			}
		</div>
	);
}

export default connect( ( state, ownProps ) => {
	const term = ownProps.params.slug;
	const taxonomy = ownProps.route.taxonomy;
	const termId = getTermIdFromSlug( state, taxonomy, term );
	const termData = getTerm( state, termId );
	const requesting = isRequestingTerm( state, taxonomy, term );

	const query = {};
	query.page = ownProps.params.paged || 1;
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
		loading: requesting && ! termData
	};
} )( TermHeader );
