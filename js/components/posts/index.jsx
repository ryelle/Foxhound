/* global FoxhoundSettings */
// External dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import postActions from 'state/posts/actions';
import { getVisiblePosts, getTotalPostsCount } from 'state/posts/selectors';
import { getCurrentPage } from 'state/ui/selectors';
import PostList from './list';
import Pagination from '../pagination/archive';

const Index = React.createClass( {
	componentDidMount() {
		this.props.fetchPosts();
	},

	setTitle() {
		document.title = FoxhoundSettings.title;
	},

	renderPlaceholder() {
		return (
			<div className="placeholder">Your posts are loading…</div>
		);
	},

	render() {
		let posts = this.props.posts;
		this.setTitle();

		return (
			<div className="site-content">
				{ this.props.isFetching ?
					this.renderPlaceholder() :
					<PostList posts={ posts } />
				}
				<Pagination current={ this.props.page } end={ this.props.total } />
			</div>
		);
	}
} );

export default connect(
	state => {
		// defaultFilter is a prop passed from the render function
		return {
			isFetching: state.posts.isFetching,
			page: getCurrentPage( state ),
			total: getTotalPostsCount( state ),
			posts: getVisiblePosts( state )
		};
	},
	dispatch => bindActionCreators( {
		fetchPosts: postActions.fetchPosts,
	}, dispatch )
)( Index );
