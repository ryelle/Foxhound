/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingPage } from 'state/pages/selectors';
import { requestPage } from 'state/pages/actions';

class QueryPage extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.pagePath === nextProps.pagePath ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingPage ) {
			console.log( 'Request single page', props.pagePath );
			props.requestPage( props.pagePath );
		}
	}

	render() {
		return null;
	}
}

QueryPage.propTypes = {
	pagePath: PropTypes.string,
	requestingPage: PropTypes.bool,
	requestPage: PropTypes.func
};

QueryPage.defaultProps = {
	requestPage: () => {}
};

export default connect(
	( state, ownProps ) => {
		const pagePath = ownProps.pagePath;
		return {
			requestingPage: isRequestingPage( state, pagePath ),
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestPage
		}, dispatch );
	}
)( QueryPage );
