// External dependencies
import React from 'react';
import isEqual from 'lodash/isEqual';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import TermStore from '../../stores/term-store';
import PostList from '../posts/list';
import Pagination from '../pagination/archive';

/*
 * Method to retrieve state from Stores
 */
function getState( term ) {
	return {
		data: TermStore.getTerm( term ),
		posts: PostsStore.getPosts(),
		paginationLimit: PostsStore.getPaginationLimit(),
	};
}

let Term = React.createClass( {

	propTypes: {
		page: React.PropTypes.number.isRequired,
		term: React.PropTypes.string.isRequired,
		taxonomy: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return getState( this.props.term );
	},

	componentDidMount: function() {
		TermStore.addChangeListener( this._onChange );
		PostsStore.addChangeListener( this._onChange );

		let filter = this.getFilter();
		API.getTerm( this.props );
		API.getPosts( { filter: filter, page: this.props.page } );
	},

	componentDidUpdate: function( prevProps ) {
		if ( ! isEqual( prevProps, this.props ) ) {
			let filter = this.getFilter();
			API.getTerm( this.props );
			API.getPosts( { filter: filter, page: this.props.page } );
		}
	},

	componentWillUnmount: function() {
		TermStore.removeChangeListener( this._onChange );
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.term ) );
	},

	getFilter: function() {
		let filter = {};
		if ( 'categories' === this.props.taxonomy ) {
			filter.category_name = this.props.term;
		} else {
			filter.tag = this.props.term;
		}
		return filter;
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		let term = this.state.data;
		if ( 'undefined' === typeof term.name ) {
			return this.renderEmpty();
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">{ term.name }</h1>
					{ term.description.length > 0 ?
						<div className="taxonomy-description">{ term.description }</div> :
						null
					}
				</header>
				<PostList posts={ this.state.posts } />

				<Pagination current={ this.props.page } end={ this.state.paginationLimit } base={ `/${ this.props.taxonomy }/${ this.props.term }` }/>
			</div>
		);
	}
} );

export default Term;
