/*global FoxhoundSettings */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';

const Attachment = React.createClass( {
	render() {
		const classes = classNames( {
			'entry': true,
			'attachment': true,
			'type-attachment': true
		} );

		const meta = {
			title: 'Attachment – ' + FoxhoundSettings.meta.title,
		};

		return (
			<article className={ classes }>
				<DocumentMeta { ...meta } />
				<BodyClass classes={ [ 'attachment', 'single', 'single-attachment' ] } />
				<h2 className="entry-title">Attachment</h2>

				<div className="entry-meta"></div>
				<div className="entry-content">
					<p>Attachment here.</p>
				</div>
			</article>
		);
	}
} );

export default connect( ( state, ownProps ) => {
	const id = ownProps.params.id || false;

	console.log( id );

	return {};
} )( Attachment );
