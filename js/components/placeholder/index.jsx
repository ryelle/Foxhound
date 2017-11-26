/** @format */
/**
 * External Dependencies
 */
import React from 'react';

function Placeholder( props ) {
	let placeholderContent;
	if ( 'comments' === props.type ) {
		placeholderContent = <p className="placeholder-comment">Loading comments…</p>;
	} else if ( 'search' === props.type ) {
		placeholderContent = <h1 className="entry-title placeholder-title">Searching…</h1>;
	} else {
		placeholderContent = <h1 className="entry-title placeholder-title">Loading…</h1>;
	}

	return <div className="placeholder">{ placeholderContent }</div>;
}

export default Placeholder;
