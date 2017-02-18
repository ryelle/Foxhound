// External dependencies
import React from 'react';

let Media = React.createClass( {
	propTypes: {
		media: React.PropTypes.object.isRequired,
		parentClass: React.PropTypes.string,
	},

	render: function() {
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
} );

export default Media;
