import moment from 'moment';
import find from 'lodash/find';

export function getTitle( data ) {
	return { __html: data.title.rendered };
}

// <a href=${ data.link } class="read-more">Read More <span class="screen-reader-text">${ data.title.rendered }</span></a>
export function getExcerpt( data ) {
	if ( ! data.excerpt.protected ) {
		if ( 'image' === data.format && ! data.excerpt.rendered ) {
			return { __html: data.content.rendered };
		}
		return { __html: data.excerpt.rendered };
	}

	return { __html: '<p>This content is password-protected.</p>' };
}

export function getContent( data ) {
	if ( ! data.content.protected ) {
		return { __html: data.content.rendered };
	}

	return { __html: '<p>This content is password-protected.</p>' };
}

export function getDate( data ) {
	let date = moment( data.date );
	return date.format( 'MMMM Do YYYY' );
}

export function getTime( data ) {
	let date = moment( data.date );
	return date.format( 'h:mm a' );
}

export function getFeaturedMedia( data ) {
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
}

export function getMediaContent( data ) {
	if ( ! data.description.protected ) {
		return { __html: data.description.rendered };
	}

	return { __html: '<p>This content is password-protected.</p>' };
}
