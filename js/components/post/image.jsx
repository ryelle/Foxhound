// External dependencies
import React from 'react';

let Media = React.createClass( {
	propTypes: {
		media: React.PropTypes.object.isRequired,
		parentClass: React.PropTypes.string,
	},

	render: function() {
		let media, mediaElement;

		media = this.props.media;

		switch ( media.media_type ) {
			case 'image':
				mediaElement = (
					<img src={ media.source_url } />
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
