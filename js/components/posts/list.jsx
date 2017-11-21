// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import Post from './single';

class PostList extends React.Component {
    static propTypes = {
		posts: PropTypes.array.isRequired,
		shouldShowEmpty: PropTypes.bool,
		error: PropTypes.string,
	};

    static defaultProps = {
        shouldShowEmpty: true,
        error: 'It seems we can’t find what you’re looking for. Perhaps searching can help.',
    };

    renderPosts = () => {
		return this.props.posts.map( ( post, i ) => {
			return <Post key={ 'post-' + i } { ...post } />
		} );
	};

    renderEmpty = () => {
		if ( ! this.props.shouldShowEmpty ) {
			return null;
		}

		return (
			<article className="entry">
				<h2 className="entry-title">Nothing Found</h2>

				<div className="entry-content">
					<p>{ this.props.error }</p>
				</div>

				<div className="entry-meta"></div>
			</article>
		)
	};

    render() {
		if ( ! this.props.posts ) {
			return null;
		}

		return (
			<div className="site-main">
				{ this.props.posts.length ?
					this.renderPosts() :
					this.renderEmpty()
				}
			</div>
		);
	}
}

export default PostList;
