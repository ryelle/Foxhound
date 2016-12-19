import moment from 'moment';
import find from 'lodash/find';

export default {
	getTitle: function( data ) {
		return { __html: data.title.rendered };
	},

	// <a href=${ data.link } class="read-more">Read More <span class="screen-reader-text">${ data.title.rendered }</span></a>
	getExcerpt: function( data ) {
		if ( ! data.excerpt.protected ) {
			if ( 'image' === data.format && ! data.excerpt.rendered ) {
				return { __html: data.content.rendered };
			}
			return { __html: data.excerpt.rendered };
		}

		return { __html: '<p>This content is password-protected.</p>' };
	},

	getContent: function( data ) {
		if ( ! data.content.protected ) {
			return { __html: data.content.rendered };
		}

		return { __html: '<p>This content is password-protected.</p>' };
	},

	getDate: function( data ) {
		let date = moment( data.date );
		return date.format( 'MMMM Do YYYY' );
	},

	getTime: function( data ) {
		let date = moment( data.date );
		return date.format( 'h:mm a' );
	},

	getFeaturedMedia: function( data ) {
		if ( ! data._embedded ) {
			return false;
		}
		if ( 'undefined' === typeof data._embedded['wp:featuredmedia'] ) {
			return false;
		}
		let media = find( data._embedded['wp:featuredmedia'], function( item ) {
			return ( 'undefined' !== typeof item.source_url );
		} );
		return media;
	},

	getMediaContent: function( data ) {
		if ( ! data.description.protected ) {
			return { __html: data.description.rendered };
		}

		return { __html: '<p>This content is password-protected.</p>' };
	}
};
