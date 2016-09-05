// External dependencies
import React from 'react';
import { Link } from 'react-router';

let Pagination = React.createClass( {
	render() {
		if ( this.props.isFirstPage && this.props.isLastPage ) {
			return null;
		}

		let next, prev;
		next = parseInt( this.props.current ) + 1;
		prev = parseInt( this.props.current ) - 1;

		return (
			<nav className="navigation posts-navigation clear" role="navigation">
				<div className="nav-links">
					{ ! this.props.isFirstPage ?
						<div className="nav-previous">
							<Link to={ `${ this.props.path }p/${ prev }` }>Previous Page</Link>
						</div> :
						null
					}
					{ ! this.props.isLastPage ?
						<div className="nav-next">
							<Link to={ `${ this.props.path }p/${ next }` }>Next Page</Link>
						</div> :
						null
					}
				</div>
			</nav>
		);
	}
} );

export default Pagination;
