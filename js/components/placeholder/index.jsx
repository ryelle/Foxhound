// External dependencies
import React from 'react';

let Placeholder = React.createClass( {
	render() {
		let placeholderContent;
		if ( 'posts' === this.props.type ) {
			placeholderContent = (
				<div className="slider">
					<div className="fill"></div>
				</div>
			);
		} else if ( 'comments' === this.props.type ) {
			placeholderContent = (
				<p className="placeholder-comment">Loading comments…</p>
			);
		} else {
			placeholderContent = (
				<h1 className="entry-title placeholder-title">Loading…</h1>
			);
		}

		return (
			<div className="placeholder">
				{ placeholderContent }
			</div>
		);
	}
} );

export default Placeholder;
