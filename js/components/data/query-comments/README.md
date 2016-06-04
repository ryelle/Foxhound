Query Comments
==============

Query Comments is a React component used in managing the fetching of post comments.

## Usage

Render the component, passing in the `postId`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryComments from 'components/data/query-comments';
import MyCommentsListItem from './list-item';

export default function MyCommentsList( { comments } ) {
	return (
		<div>
			<QueryComments postId={ 27 } />
			{ comments.map( ( comment ) => {
				return (
					<MyCommentsListItem
						key={ comment.id }
						comment={ comment } />
				);
			} }
		</div>
	);
}
```

## Props

### `postId`

<table>
	<tr><th>Type</th><td>Integer</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The post to grab comments from.
