// External dependencies
import React from 'react';

let Pagination = React.createClass( {
	propTypes: {
		postId: React.PropTypes.number,
	},

	render: function() {
		let next = true;
		let prev = true;

		return (
			<nav className="navigation post-navigation clear" role="navigation">
				<div className="nav-links">
					{ prev ?
						<div className="nav-previous">
							<a href="#">Previous Page</a>
						</div> :
						null
					}
					{ next ?
						<div className="nav-next">
							<a href="#">Next Page</a>
						</div> :
						null
					}
				</div>
			</nav>
		);
	}
} );

export default Pagination;
