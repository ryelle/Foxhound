/** @format */
/**
 * Set the focus to an element, based on a clicked link.
 *
 * @param  {HTMLElement}  clickedEl  The link element that was clicked, the href should be a reference to an ID on the page.
 */
export function skipLink( clickedEl ) {
	const attributes = clickedEl.attributes;
	const id = attributes.getNamedItem( 'href' ).value.substring( 1 );
	if ( ! /^[A-z0-9_-]+$/.test( id ) ) {
		return;
	}

	const element = document.getElementById( id );
	// Make the element focusable
	if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
		element.tabIndex = -1;
	}

	element.focus();
}

/**
 * Toggle a `focus` class on navigation items as they're tabbed through.
 *
 * @param  {FocusEvent}  event  The blur or focus event on each link item.
 */
export function toggleFocus( event ) {
	let self = event.target;

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
