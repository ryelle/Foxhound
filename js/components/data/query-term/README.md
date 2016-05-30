Query Term
===========

Query Term is a React component used in managing the fetching of term metadata.

## Usage

Render the component, passing the requested `termSlug` and `taxonomy`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryTerm from 'components/data/query-term';
import MyTermItem from './term-item';

export default function MyTerm( { term } ) {
	return (
		<div>
			<QueryTerm
				taxonomy={ 'category' }
				termSlug={ 'nature' } />
			<MyTermItem term={ term } />
		</div>
	);
}
```

## Props

### `taxonomy`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The taxonomy for the given term

### `termSlug`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The slug of the term to fetch
