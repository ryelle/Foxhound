// Accessibility helpers

import React from 'react';

const FocusHandler = React.createClass( {
	componentDidUpdate( prevProps ) {
		const { routerProps, elementId } = this.props;
		const prevRouterProps = prevProps.routerProps;

		if ( routerProps.location === prevRouterProps.location ) {
			return;
		}

		const element = document.getElementById( elementId );
		element.focus();
	},

	render() {
		return this.props.children;
	}
} );

export function keyboardFocusReset( elementId ) {
	return {
		renderRouterContext: ( child, props ) => (
			<FocusHandler
				routerProps={ props }
				elementId={ elementId }
			>
				{ child }
			</FocusHandler>
		),
	};
};

export function skipLink( element ) {
	const id = element.href.substring( 1 );

	if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
		return;
	}

	if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
		element.tabIndex = -1;
	}

	element.focus();
}

export function toggleFocus( event ) {
	var self = event.target;

	// Move up through the ancestors of the current link until we hit .main-navigation.
	while ( -1 === self.className.indexOf( 'main-navigation' ) ) {
		// On li elements toggle the class .focus.
		if ( 'li' === self.tagName.toLowerCase() ) {
			if ( -1 !== self.className.indexOf( 'focus' ) ) {
				self.className = self.className.replace( ' focus', '' );
			} else {
				self.className += ' focus';
			}
		}

		self = self.parentElement;
	}
}
