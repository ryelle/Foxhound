/* global FoxhoundSettings */
// External dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import postActions from 'state/posts/actions';
import uiActions from 'state/ui/actions';
import { getVisiblePosts, getTotalPostsCount, getTotalPagesCount } from 'state/posts/selectors';
import { getCurrentPage } from 'state/ui/selectors';

// Components
import PostList from './list';
import Pagination from '../pagination/archive';

const Index = React.createClass( {
	componentDidMount() {
		const paged = this.props.params.paged || 1;
		this.props.fetchPosts( { paged: paged } );
		this.props.loadPage( paged );
		console.log( 'Mounted, requesting posts…' );
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
				<Pagination current={ this.props.page } end={ this.props.totalPages } />
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
			totalPages: getTotalPagesCount( state ),
			posts: getVisiblePosts( state )
		};
	},
	dispatch => bindActionCreators( {
		fetchPosts: postActions.fetchPosts,
		loadPage: uiActions.loadPage,
	}, dispatch )
)( Index );
