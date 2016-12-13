/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getMenu } from 'wordpress-query-menu/lib/selectors';

const isItemSelected = function( item ) {
	let re;
	if ( location.pathname !== '/' ) {
		re = new RegExp( location.pathname + '$' );
	} else {
		re = new RegExp( location.hostname + '/$' );
	}
	return ( location.pathname === item.url ) || re.test( item.url );
};

const blur = function( event ) {
	event.target.blur();
};

const toggleFocus = function( event ) {
	var self = event.target;

	// Move up through the ancestors of the current link until we hit .nav-menu.
	while ( -1 === self.className.indexOf( 'nav-menu' ) ) {
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
};

const SubMenu = ( { items, onClick } ) => {
	let menu = items.map( function( item, i ) {
		return <MenuItem item={ item } isSelected={ isItemSelected( item ) } key={ i } onClick={ onClick } />
	} );

	return (
		<ul className="sub-menu">
			{ menu }
		</ul>
	);
}

const MenuItem = ( { item, onClick, isSelected = false } ) => {
	const classes = classNames( {
		'menu-item': true,
		'menu-item-has-children': item.children.length,
		'current-menu-item': isSelected,
		'current-menu-ancestor': false,
		'current-menu-parent': false,
	}, item.classes );

	return (
		<li className={ classes } aria-haspopup={ item.children.length > 0 }>
			<a href={ item.url } onClick={ onClick } onFocus={ toggleFocus } onBlur={ toggleFocus }>{ item.title }</a>
			{ item.children.length ?
				<SubMenu items={ item.children } onClick={ onClick } /> :
				null
			}
		</li>
	);
}

const Navigation = React.createClass( {
	getInitialState() {
		return {
			isMenuOpen: false,
			selected: this.props.currentPage,
		}
	},

	toggleMenu( event ) {
		event.preventDefault();
		this.setState( { isMenuOpen: ! this.state.isMenuOpen } );
	},

	render() {
		let menu = this.props.menu.map( ( item, i ) => {
			const onClick = ( event ) => {
				blur( event );
				this.setState( { selected: item.url } );
				this.setState( { isMenuOpen: ! this.state.isMenuOpen } );
			};
			return <MenuItem item={ item } isSelected={ isItemSelected( item ) } onClick={ onClick } key={ i } />
		} );

		let menuClasses = classNames( {
			'menu-container': true,
			'menu-open': this.state.isMenuOpen,
		} );

		return (
			<div className={ menuClasses }>
				<div className="menu-toggle" onClick={ this.toggleMenu }>
					<button onClick={ this.toggleMenu }>Menu</button>
				</div>
				<ul className="menu nav-menu" aria-expanded="false">
					{ menu }
				</ul>
			</div>
		);
	}
} );

export default connect( ( state ) => {
	const path = FoxhoundSettings.URL.path || '/';
	const menu = getMenu( state, 'primary' );
	return {
		currentPage: state.routing.locationBeforeTransitions.pathname || path,
		menu: menu || [],
	};
} )( Navigation );
