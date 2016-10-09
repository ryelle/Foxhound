// Accessibility helpers

import React from 'react';

const ExampleComponent = React.createClass( {
	componentDidUpdate( prevProps ) {
		const { routerProps } = this.props;
		const prevRouterProps = prevProps.routerProps;

		if ( routerProps.location === prevRouterProps.location ) {
			return;
		}

		const element = document.getElementById( 'main' );
		element.focus();
	},

	render() {
		return this.props.children;
	}
} );

export const keyboardFocusReset = {
	renderRouterContext: ( child, props ) => (
		<ExampleComponent
			routerProps={ props }
		>
			{ child }
		</ExampleComponent>
	),
};

export function skipLinks( element ) {
	const id = element.href.substring( 1 );

	if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
		return;
	}

	if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
		element.tabIndex = -1;
	}

	element.focus();
}
