// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import PostsStore from '../../stores/posts-store';

let PostMeta = React.createClass( {
	propTypes: {
		slug: React.PropTypes.string.isRequired,
		date: React.PropTypes.string,
		humanDate: React.PropTypes.string,
	},

	render: function() {
		let categories = PostsStore.getCategoriesForPost( this.props.slug );
		let tags = PostsStore.getTagsForPost( this.props.slug );

		if ( 'undefined' !== typeof categories ) {
			categories = categories.map( function( item, i ) {
				return (
					<a key={ i } href={ item.link }>{ item.name }</a>
				);
			} );
		} else {
			categories = null;
		}

		if ( 'undefined' !== typeof tags ) {
			tags = tags.map( function( item, i ) {
				return (
					<a key={ i } href={ item.link }>{ item.name }</a>
				);
			} );
		} else {
			tags = null;
		}

		return (
			<footer className="entry-meta">
				<div className="entry-meta-item">
					<span className="entry-meta-label">published </span>
					<time className="entry-meta-value entry-date published updated" dateTime={ this.props.date }>{ this.props.humanDate }</time>
				</div>
				<div className="entry-meta-item">
					<span className="entry-meta-label">posted in </span>
					<span className="entry-meta-value">{ categories }</span>
					<span className="fancy-amp"> &amp; </span>
					<span className="entry-meta-label">tagged </span>
					<span className="entry-meta-value">{ tags }</span>
				</div>
			</footer>
		);
	}
} );

export default PostMeta;
