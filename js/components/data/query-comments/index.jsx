/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingCommentsForPost } from 'state/comments/selectors';
import { requestComments } from 'state/comments/actions';

class QueryComments extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.postId === nextProps.postId ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requesting ) {
			console.log( 'Request comments for', props.postId );
			props.requestComments( props.postId );
		}
	}

	render() {
		return null;
	}
}

QueryComments.propTypes = {
	postId: PropTypes.number,
	requesting: PropTypes.bool,
	requestComments: PropTypes.func
};

QueryComments.defaultProps = {
	requestComments: () => {}
};

export default connect(
	( state, ownProps ) => {
		const postId = ownProps.postId;
		return {
			requesting: isRequestingCommentsForPost( state, postId ),
		};
	},
	( dispatch ) => bindActionCreators( { requestComments }, dispatch )
)( QueryComments );
