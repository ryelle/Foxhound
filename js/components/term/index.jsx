// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import PostsStore from '../../stores/posts-store';
import TermStore from '../../stores/term-store';
import PostList from '../posts/list';
import Pagination from '../pagination';

/**
 * Method to retrieve state from Stores
 */
function getState( term ) {
	return {
		data: TermStore.getTerm( term ),
		posts: PostsStore.getPosts(),
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
		let filter = {};
		if ( 'category' === this.props.taxonomy ) {
			filter.category_name = this.props.term;
		} else {
			filter.tag = this.props.term;
		}

		TermStore.addChangeListener( this._onChange );
		PostsStore.addChangeListener( this._onChange );

		API.getTerm( this.props );
		// API.getPosts( filter ); -- Not the right API call
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			let filter = {};
			if ( 'category' === this.props.taxonomy ) {
				filter.category_name = this.props.term;
			} else {
				filter.tag = this.props.term;
			}
			API.getTerm( this.props );
			// API.getPosts( filter ); -- Not the right API call
		}
	},

	componentWillUnmount: function() {
		TermStore.removeChangeListener( this._onChange );
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.term ) );
	},

	renderEmpty: function() {
		return null;
	},

	render: function() {
		let category = this.state.data;
		if ( 'undefined' === typeof category.name ) {
			return this.renderEmpty();
		}

		return (
			<div className="card">
				<header className="page-header">
					<h1 className="page-title">{ category.name }</h1>
					{ category.description.length > 0 ?
						<div className="taxonomy-description">{ category.description }</div>:
						null
					}
				</header>
				<PostList posts={ this.state.posts } />
			</div>
		);
	}
} );

export default Term;
