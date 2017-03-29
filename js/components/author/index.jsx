/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';

// Internal dependencies
import QueryUser from 'wordpress-query-user';
import { isRequestingUser, getUserIdFromName, getUser } from 'wordpress-query-user/lib/selectors';
import Placeholder from 'components/placeholder';
import List from './list';

const AuthorHeader = ( { userName, loading, user = {}, query = {} } ) => {
	const meta = {
		title: user.name + ' – ' + FoxhoundSettings.meta.title,
	};
	meta.title = he.decode( meta.title );

	return (
		<div className="card">
			<DocumentMeta { ...meta } />
			<BodyClass classes={ [ 'archive', 'author' ] } />
			<QueryUser userId={ userName } />
			{ loading ?
				<Placeholder type="author" /> :
				<div>
					<header className="page-header">
						<h1 className="page-title">Archive for { user.name }</h1>
						{ user.description && <p>{ user.description }</p> }
					</header>
					<List query={ query } author={ user.slug } />
				</div>
			}
		</div>
	);
}

export default connect( ( state, ownProps ) => {
	const userName = ownProps.params.slug;
	const user = getUser( state, userName );
	const userId = getUserIdFromName( state, userName );
	const requesting = isRequestingUser( state, userName );

	const query = {};
	query.page = ownProps.params.paged || 1;
	if ( userId ) {
		query.author = [ userId ];
	}

	return {
		query,
		userName,
		user,
		requesting,
		loading: requesting && ! user
	};
} )( AuthorHeader );
