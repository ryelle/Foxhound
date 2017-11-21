// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

class Media extends React.Component {
    static propTypes = {
		media: PropTypes.object.isRequired,
		parentClass: PropTypes.string,
	};

    render() {
		const media = this.props.media;

		let mediaElement;
		switch ( media.media_type ) {
			case 'image':
				mediaElement = (
					<img src={ media.source_url } alt={ media.alt_text } />
				);
				break;
		}

		return (
			<div className={ this.props.parentClass }>
				{ mediaElement }
			</div>
		);
	}
}

export default Media;
