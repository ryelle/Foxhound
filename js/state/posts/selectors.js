import filter from 'lodash/filter';
import { getCurrentPage } from 'state/ui/selectors';

const getVisiblePosts = function( state ) {
	const page = getCurrentPage( state );
	return filter( state.posts.items, { page } );
};

const getTotalPostsCount = function( state ) {
	return state.posts.total;
};

export { getVisiblePosts, getTotalPostsCount };
