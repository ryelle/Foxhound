/*global FoxhoundSettings */
import classNames from 'classnames';

export const setMeta = ( page ) => {
	let title = FoxhoundSettings.title;
	let bodyClass = {
		'logged-in': ( parseInt( FoxhoundSettings.user ) !== 0 ),
		'not-found': ( 'not-found' === page ),
		'home': ( 'home' === page ),
		'blog': ( 'home' === page ),
		'archive': ( -1 !== [ 'category', 'tag', 'date' ].indexOf( page ) ),
		'date': ( 'date' === page ),
		'category': ( 'category' === page ),
		'tag': ( 'tag' === page ),
		'single': ( 'post' === page ) || ( 'page' === page ),
		'page': ( 'page' === page ),
		'single-page': ( 'page' === page ),
		'single-post': ( 'post' === page ),
	};

	if ( 'not-found' === page ) {
		title = FoxhoundSettings.title + ' – Page not found';
	}

	return () => {
		document.title = title;
		document.body.className = classNames( bodyClass );
	}
};
