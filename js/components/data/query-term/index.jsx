/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingTerm } from 'state/terms/selectors';
import { requestTerm } from 'state/terms/actions';

class QueryTerm extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.termSlug === nextProps.termSlug &&
				this.props.taxonomy === nextProps.taxonomy ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingTerm ) {
			console.log( 'Request single term', props.taxonomy, props.termSlug );
			props.requestTerm( props.taxonomy, props.termSlug );
		}
	}

	render() {
		return null;
	}
}

QueryTerm.propTypes = {
	termSlug: PropTypes.string,
	taxonomy: PropTypes.string,
	requestingTerm: PropTypes.bool,
	requestTerm: PropTypes.func
};

QueryTerm.defaultProps = {
	requestTerm: () => {}
};

export default connect(
	( state, ownProps ) => {
		const { termSlug, taxonomy } = ownProps;
		return {
			requestingTerm: isRequestingTerm( state, taxonomy, termSlug ),
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestTerm
		}, dispatch );
	}
)( QueryTerm );
