/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import shallowEqual from 'shallowequal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingPostsForQuery, isRequestingPost } from 'state/posts/selectors';
import { requestPosts, requestPost } from 'state/posts/actions';

class QueryPosts extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.postId === nextProps.postId &&
				shallowEqual( this.props.query, nextProps.query ) ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		const single = !! props.postId;

		if ( ! single && ! props.requestingPosts ) {
			console.log( 'Request post list using query', props.query );
			props.requestPosts( props.query );
		}

		if ( single && ! props.requestingPost ) {
			console.log( 'Request single post', props.postId );
			props.requestPost( props.postId );
		}
	}

	render() {
		return null;
	}
}

QueryPosts.propTypes = {
	postId: PropTypes.number,
	query: PropTypes.object,
	requestingPosts: PropTypes.bool,
	requestPosts: PropTypes.func
};

QueryPosts.defaultProps = {
	requestPosts: () => {}
};

export default connect(
	( state, ownProps ) => {
		const { postId, query } = ownProps;
		return {
			requestingPost: isRequestingPost( state, postId ),
			requestingPosts: isRequestingPostsForQuery( state, query )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestPosts,
			requestPost
		}, dispatch );
	}
)( QueryPosts );
