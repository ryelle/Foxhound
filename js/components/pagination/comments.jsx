/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

function Pagination( props ) {
	const next = props.current + 1;
	const prev = props.current - 1;

	return (
		<nav className="navigation comment-navigation clear" role="navigation">
			<div className="nav-links">
				{ prev > 0 ? (
					<div className="nav-previous">
						<a href="#" onClick={ props.onPreviousPage }>
                            Older Comments
						</a>
					</div>
				) : null }
				{ next <= props.end ? (
					<div className="nav-next">
						<a href="#" onClick={ props.onNextPage }>
                            Newer Comments
						</a>
					</div>
				) : null }
			</div>
		</nav>
	);
}

Pagination.propTypes = {
	start: PropTypes.number,
	current: PropTypes.number,
	end: PropTypes.number,
	onNextPage: PropTypes.func,
	onPreviousPage: PropTypes.func,
};

Pagination.defaultProps = {
	start: 1,
	current: 1,
	onNextPage: noop,
	onPreviousPage: noop,
};

export default Pagination;
