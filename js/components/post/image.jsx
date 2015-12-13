// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';

/**
 * Method to retrieve state from Stores
 */
function getState( id ) {
	return {
		data: PostsStore.getPostById( id )
	};
}

let Media = React.createClass( {
	propTypes: {
		postId: React.PropTypes.number.isRequired,
	},

	getInitialState: function() {
		return getState( this.props.postId );
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );
		API.getPostById( this.props.postId, 'media' );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps.postId !== this.props.postId ) {
			API.getPostById( this.props.postId, 'media' );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.postId ) );
	},

	renderPlaceholder: function() {
		return null;
	},

	render: function() {
		let media = this.state.data;

		if ( 'undefined' === typeof media.id ) {
			return this.renderPlaceholder();
		}

		let attrs = {
			height: this.props.height || 'auto',
			width: this.props.width || 'auto',
		};

		let mediaElement = null;

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
