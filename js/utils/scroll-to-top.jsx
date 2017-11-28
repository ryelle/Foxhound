/** @format */
/**
 * External Dependencies
 */
import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
	componentDidUpdate( prevProps ) {
		if ( this.props.location !== prevProps.location ) {
			// Reset focus to top of #main
			const element = document.getElementById( 'main' );
			element.focus();
			// Scroll browser to top of page
			window.scrollTo( 0, 0 );
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter( ScrollToTop );
