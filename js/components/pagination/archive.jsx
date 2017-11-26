/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import { Link } from 'react-router';

function Pagination( props ) {
	if ( props.isFirstPage && props.isLastPage ) {
		return null;
	}

	const next = parseInt( props.current ) + 1;
	const prev = parseInt( props.current ) - 1;

	return (
		<nav className="navigation posts-navigation clear" role="navigation">
			<div className="nav-links">
				{ ! props.isFirstPage ? (
					<div className="nav-previous">
						<Link to={ `${ props.path }p/${ prev }` }>Previous Page</Link>
					</div>
				) : null }
				{ ! props.isLastPage ? (
					<div className="nav-next">
						<Link to={ `${ props.path }p/${ next }` }>Next Page</Link>
					</div>
				) : null }
			</div>
		</nav>
	);
}

export default Pagination;
