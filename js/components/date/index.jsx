// External dependencies
import React from 'react';
import isEqual from 'lodash/lang/isEqual';

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
		year: React.PropTypes.number.isRequired,
		month: React.PropTypes.number,
	},

	getDefaultProps: function() {
		return {
			month: 0
		};
	},

	getInitialState: function() {
		return getState( this.props.year, this.props.month );
	},

	getFilter: function() {
		let filter = {
			year: this.props.year
		};
		if ( 0 !== this.props.month ) {
			filter.monthnum = this.props.month;
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
		this.setState( getState( this.props.year, this.props.month ) );
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		let posts = this.state.data;
		if ( ! posts.length ) {
			return this.renderEmpty();
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">Date Archive</h1>
				</header>
				<PostList posts={ this.state.data } />

				<Pagination current={ this.props.page } end={ this.state.paginationLimit } base={ `/${ this.props.year }/${ this.props.month }` }/>
			</div>
		);
	}
} );

export default DateArchive;
