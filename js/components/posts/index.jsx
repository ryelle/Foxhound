// External dependencies
import React from 'react';
import isEqual from 'lodash/lang/isEqual';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import PostList from './list';
import Pagination from '../pagination/archive';

/**
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: PostsStore.getPosts(),
		paginationLimit: PostsStore.getPaginationLimit(),
	};
}

let Index = React.createClass( {

	propTypes: {
		page: React.PropTypes.number.isRequired,
	},

	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );
		API.getPosts( { page: this.props.page } );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( ! isEqual( prevProps, this.props ) ) {
			API.getPosts( { page: this.props.page } );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	setTitle: function() {
		document.title = FoxhoundSettings.title;
	},

	renderPlaceholder: function() {
		return (
			<div className="placeholder">Deliciousness is loading…</div>
		);
	},

	render: function() {
		let posts = this.state.data;
		this.setTitle();

		return (
			<div className="site-content">
				{ posts.length ?
					<PostList posts={ posts } /> :
					this.renderPlaceholder()
				}
				<Pagination current={ this.props.page } end={ this.state.paginationLimit } />
			</div>
		);
	}
} );

export default Index;
