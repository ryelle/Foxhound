// External dependencies
import React from 'react';
import page from 'page';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import ContentMixin from 'utils/content-mixin';
import PostsStore from '../../stores/posts-store';

import PostMeta from './meta';
import Pagination from '../pagination/single';
// import Comments from '../comments';

/**
 * Method to retrieve state from Stores
 */
function getState( id ) {
	return {
		data: PostsStore.getPost( id )
	};
}

let SinglePost = React.createClass( {
	mixins: [ ContentMixin ],

	propTypes: {
		slug: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf( [ 'post', 'page' ] ),
	},

	getDefaultProps: function(){
		return {
			type: 'post',
		};
	},

	getInitialState: function() {
		return getState( this.props.slug );
	},

	componentDidMount: function() {
		PostsStore.addChangeListener( this._onChange );
		API.getPost( this.props.slug, this.props.type );
	},

	componentDidUpdate: function( prevProps, prevState ) {
		if ( prevProps !== this.props ) {
			API.getPost( this.props.slug, this.props.type );
		}
	},

	componentWillUnmount: function() {
		PostsStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState( this.props.slug ) );
	},

	setTitle: function() {
		let post = this.state.data;
		if ( 'undefined' !== typeof post.title ) {
			document.title = `${post.title.rendered} — ${FoxhoundSettings.title}`;
		}
	},

	close: function( event ) {
		page( '/' );
	},

	renderPlaceholder: function() {
		return null;
	},

	render: function() {
		let post, classes;

		post = this.state.data;
		if ( 'undefined' === typeof post.title ) {
			return this.renderPlaceholder();
		}

		this.setTitle();

		classes = classNames( {
			'entry': true
		} );

		return (
			<div className="card">
				<article id={ `post-${ post.id }` } className={ classes }>
					<h1 className="entry-title" dangerouslySetInnerHTML={ this.getTitle( post ) } />
					<div className="entry-meta"></div>
					<div className="entry-content" dangerouslySetInnerHTML={ this.getContent( post ) } />

					<PostMeta slug={ post.slug } date={ post.date } humanDate={ this.getDate( post ) } />
				</article>

				<Pagination currentId={ post.id } />
			</div>
		);
	}
} );

export default SinglePost;
