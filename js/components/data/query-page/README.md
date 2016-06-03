Query Page
===========

Query Page is a React component used in managing the fetching of page queries.

## Usage

Render the component, passing in the `path`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryPage from 'components/data/query-page';
import MyPageItem from './page-item';

export default function MyPageComponent( { page } ) {
	return (
		<div>
			<QueryPage path={ 'about/' } />
			<MyPageItem page={ page } />
		</div>
	);
}
```

## Props

### `path`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The path to be used in requesting page.
