// External dependencies
import React from 'react';
import { Link } from 'react-router';

let Pagination = React.createClass( {
	render() {
		let next, prev;
		next = this.props.current + 1;
		prev = this.props.current - 1;

		return (
			<nav className="navigation posts-navigation clear" role="navigation">
				<div className="nav-links">
					{ ( prev > 0 ) ?
						<div className="nav-previous">
							<Link to={ `/page/${ prev }` }>Previous Page</Link>
						</div> :
						null
					}
					{ ( next <= this.props.end ) ?
						<div className="nav-next">
							<Link to={ `/page/${ next }` }>Next Page</Link>
						</div> :
						null
					}
				</div>
			</nav>
		);
	}
} );

export default Pagination;
