import moment from 'moment';
import find from 'lodash/collection/find';

export default {
	getTitle: function( data ) {
		return { __html: data.title.rendered };
	},

	// <a href=${ data.link } class="read-more">Read More <span class="screen-reader-text">${ data.title.rendered }</span></a>
	getExcerpt: function( data ) {
		return { __html: data.excerpt.rendered };
	},

	getContent: function( data ) {
		return { __html: data.content.rendered };
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
		if ( 'undefined' === typeof data._embedded['https://api.w.org/featuredmedia'] ) {
			return false;
		}
		let media = find( data._embedded['https://api.w.org/featuredmedia'], function( item ) {
			return ( 'undefined' !== typeof item.source_url );
		} );
		return media;
	},

};
