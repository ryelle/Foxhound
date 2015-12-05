export default {
	getTitle: function( data ) {
		return { __html: data.title.rendered };
	},

	getExcerpt: function( data ) {
		return { __html: data.excerpt.rendered };
	},

	getContent: function( data ) {
		return { __html: data.content.rendered };
	},
};