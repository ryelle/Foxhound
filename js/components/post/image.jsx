/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

function Media( props ) {
	const media = props.media;

	let mediaElement;
	switch ( media.media_type ) {
		case 'image':
			mediaElement = <img src={ media.source_url } alt={ media.alt_text } />;
			break;
	}

	return <div className={ props.parentClass }>{ mediaElement }</div>;
}

Media.propTypes = {
	media: PropTypes.object.isRequired,
	parentClass: PropTypes.string,
};

export default Media;
