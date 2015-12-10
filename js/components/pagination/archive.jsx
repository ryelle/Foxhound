// External dependencies
import React from 'react';

let Pagination = React.createClass( {
	propTypes: {
		start: React.PropTypes.number,
		current: React.PropTypes.number,
		end: React.PropTypes.number.isRequired,
		base: React.PropTypes.string,
	},

	getDefaultProps: function(){
		return {
			start: 1,
			current: 1,
			base: '',
		};
	},

	render: function() {
		let next = this.props.current + 1;
		let prev = this.props.current - 1;

		return (
			<nav className="navigation posts-navigation clear" role="navigation">
				<div className="nav-links">
					{ ( prev > 0 ) ?
						<div className="nav-previous">
							{ ( prev === 1 ) ?
								<a href={ `${ this.props.base }/` }>Previous Page</a> :
								<a href={ `${ this.props.base }/page/${ prev }/` }>Previous Page</a>
							}
						</div> :
						null
					}
					{ ( next <= this.props.end ) ?
						<div className="nav-next">
							<a href={ `${ this.props.base }/page/${ next }/` }>Next Page</a>
						</div> :
						null
					}
				</div>
			</nav>
		);
	}
} );

export default Pagination;
