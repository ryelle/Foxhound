// External dependencies
import React from 'react';

let Post = React.createClass( {
	propTypes: {
		start: React.PropTypes.number,
		current: React.PropTypes.number,
		end: React.PropTypes.number.isRequired,
	},

	getDefaultProps: function(){
		return {
			start: 1,
			current: 1
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
								<a href={ `/` }>Previous Page</a> :
								<a href={ `/page/${ prev }/` }>Previous Page</a>
							}
						</div> :
						null
					}
					{ ( next <= this.props.end ) ?
						<div className="nav-next">
							<a href={ `/page/${ next }/` }>Next Page</a>
						</div> :
						null
					}
				</div>
			</nav>
		);
	}
} );

export default Post;
