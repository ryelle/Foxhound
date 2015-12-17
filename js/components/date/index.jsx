// External dependencies
import React from 'react';
import isEqual from 'lodash/lang/isEqual';
import isNaN from 'lodash/lang/isNaN';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import PostList from '../posts/list';
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

let DateArchive = React.createClass( {

	propTypes: {
		page: React.PropTypes.number.isRequired,
		year: React.PropTypes.string.isRequired,
		month: React.PropTypes.string,
	},

	getDefaultProps: function() {
		return {
			month: ''
		};
	},

	getInitialState: function() {
		return getState();
	},

	getFilter: function() {
		let filter = {
			year: parseInt( this.props.year )
		};
		if ( ( '' !== this.props.month ) && ! isNaN( parseInt( this.props.month ) ) ) {
			filter.monthnum = parseInt( this.props.month );
		}
		return filter;
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );

		let filter = this.getFilter();
		API.getPosts( { filter: filter, page: this.props.page } );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( ! isEqual( prevProps, this.props ) ) {
			let filter = this.getFilter();
			API.getPosts( { filter: filter, page: this.props.page } );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		let posts = this.state.data;
		if ( ! posts.length ) {
			return this.renderEmpty();
		}

		let baseUrl = `/${ this.props.year }`;
		if ( '' !== this.props.month ) {
			baseUrl += `/${ this.props.month }`;
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">Date Archive</h1>
				</header>
				<PostList posts={ this.state.data } />

				<Pagination current={ this.props.page } end={ this.state.paginationLimit } base={ baseUrl }/>
			</div>
		);
	}
} );

export default DateArchive;
