Query Posts
===========

Query Posts is a React component used in managing the fetching of posts queries.

## Usage

Render the component, passing in the `query`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryPosts from 'components/data/query-posts';
import MyPostsListItem from './list-item';

export default function MyPostsList( { posts } ) {
	return (
		<div>
			<QueryPosts query={ { search: 'Themes' } } />
			{ posts.map( ( post ) => {
				return (
					<MyPostsListItem
						key={ post.id }
						post={ post } />
				);
			} }
		</div>
	);
}
```

## Props

### `query`

<table>
	<tr><th>Type</th><td>Object</td></tr>
	<tr><th>Required</th><td>No</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The query to be used in requesting posts.
