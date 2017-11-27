/** @format */
/**
 * External Dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DocumentMeta from 'react-document-meta';
import BodyClass from 'react-body-class';
import he from 'he';
import QueryMedia from 'wordpress-query-media';
import { getMedia, isRequestingMedia } from 'wordpress-query-media/lib/selectors';

/**
 * Internal Dependencies
 */
import Placeholder from 'components/placeholder';
import PostMeta from 'components/post/meta';
import { getTitle, getDate, getMediaContent } from 'utils/content';

class Attachment extends React.Component {
	renderMedia = () => {
		const media = this.props.media;
		if ( ! media ) {
			return null;
		}

		const meta = {
			title: media.title.rendered + ' – ' + FoxhoundSettings.meta.title,
			description: media.caption.rendered,
			canonical: media.link,
		};
		meta.title = he.decode( meta.title );

		return (
			<article className={ classNames( [ 'entry' ] ) }>
				<DocumentMeta { ...meta } />
				<BodyClass
					classes={ [
						'attachment',
						`attachment-${ media.media_type }`,
						'single',
						'single-attachment',
					] }
				/>
				<h1 className="entry-title" dangerouslySetInnerHTML={ getTitle( media ) } />

				<div className="entry-meta" />
				<div className="entry-content" dangerouslySetInnerHTML={ getMediaContent( media ) } />

				<PostMeta post={ media } humanDate={ getDate( media ) } />
			</article>
		);
	};

	render() {
		return (
			<div className="card">
				<QueryMedia attachmentId={ this.props.id } />
				{ this.props.loading ? <Placeholder type="post" /> : this.renderMedia() }
			</div>
		);
	}
}

export default connect( ( state, { match } ) => {
	const id = parseInt( match.params.id || 0 );
	const requesting = isRequestingMedia( state, id );
	const media = getMedia( state, id );

	return {
		id,
		media,
		requesting,
		loading: requesting && ! media,
	};
} )( Attachment );
