/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';

// Internal dependencies
import QueryTerm from 'data/query-term';
import { isRequestingTerm, getTermIdFromSlug, getTerm } from 'data/state/selectors';

const TermHeader = ( { term, taxonomy, requesting, termData = {} } ) => {
	const meta = {
		title: termData.name + ' – ' + FoxhoundSettings.meta.title,
		description: termData.description,
	};

	return (
		<div>
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'archive', taxonomy ] } />
			<QueryTerm taxonomy={ taxonomy } termSlug={ term } />
			{ requesting ?
				null :
				<header className="page-header">
					<h1 className="page-title">{ termData.name }</h1>
					{ termData.description && <p>{ termData.description }</p> }
				</header>
			}
		</div>
	);
}

export default connect( ( state, ownProps ) => {
	const term = ownProps.params.slug;
	const taxonomy = ownProps.params.taxonomy;
	const termId = getTermIdFromSlug( state, taxonomy, term );

	return {
		term,
		taxonomy,
		termData: getTerm( state, termId ),
		requesting: isRequestingTerm( state, taxonomy, term )
	};
} )( TermHeader );
