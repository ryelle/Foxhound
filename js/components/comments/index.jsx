// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import CommentsStore from '../../stores/comments-store';

import Comment from './single';

/**
 * Method to retrieve state from Stores
 */
function getState( id ) {
	return {
		data: CommentsStore.getComments( id )
	};
}

let SinglePost = React.createClass( {
	propTypes: {
		postId: React.PropTypes.number.isRequired,
	},

	getInitialState: function() {
		return getState( this.props.postId );
	},

	componentDidMount: function() {
		CommentsStore.addChangeListener( this._onChange );
		API.getComments( this.props.postId );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps.postId !== this.props.postId ) {
			API.getComments( this.props.postId );
		}
	},

	componentWillUnmount: function() {
		CommentsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.postId ) );
	},

	renderPlaceholder: function() {
		return null;
	},

	render: function() {
		let comments = this.state.data;
		if ( ! comments.length ) {
			return this.renderPlaceholder();
		}

		comments = comments.map( function( item, i ) {
			return <Comment key={ i } comment={ item } />
		} );

		let titleString = `One comment on `;
		if ( comments.length > 1 ) {
			titleString = `${ comments.length } comments on `;
		}

		return (
			<div className="comments-area">
				<h2 className="comments-title">{ titleString }{ this.props.title }</h2>

				<ol className="comment-list">
					{ comments }
				</ol>

				<div className="comment-respond">
					<h3 className="comment-reply-title">Leave a Reply</h3>
				</div>
			</div>
		);
	}
} );

export default SinglePost;
