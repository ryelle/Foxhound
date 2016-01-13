// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import NavigationStore from '../../stores/navigation-store';

let SubMenu = React.createClass( {
	render: function() {
		let menu = this.props.items.map( function( item, i ) {
			return <MenuItem item={ item } key={ i } />
		} );

		return (
			<ul className="sub-menu">
				{ menu }
			</ul>
		);
	}
} );

let MenuItem = React.createClass( {
	blur: function( event ) {
		event.target.blur();
	},

	toggleFocus: function( event ) {
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
	},

	render: function() {
		let re;
		if ( location.pathname !== '/' ) {
			re = new RegExp( location.pathname + '$' );
		} else {
			re = new RegExp( location.hostname + '/$' );
		}
		let classes = classNames( {
			'menu-item': true,
			'menu-item-has-children': this.props.item.children.length,
			'current-menu-item': ( location.pathname === this.props.item.url ) || re.test( this.props.item.url ),
			'current-menu-ancestor': false,
			'current-menu-parent': false,
		}, this.props.item.classes );

		return (
			<li className={ classes } aria-haspopup={ this.props.item.children.length > 0 }>
				<a href={ this.props.item.url } onClick={ this.blur } onFocus={ this.toggleFocus } onBlur={ this.toggleFocus }>{ this.props.item.title }</a>
				{ this.props.item.children.length ?
					<SubMenu items={ this.props.item.children } /> :
					null
				}
			</li>
		);
	}
} );

/*
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: NavigationStore.getMenu(),
		isMenuOpen: false,
	};
}

let Navigation = React.createClass( {
	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
		API.getMenu( '/menu-locations/primary/' );
		NavigationStore.addChangeListener( this._onChange );
	},

	componentWillUnmount: function() {
		NavigationStore.removeChangeListener( this._onChange );
	},

	_onChange: function() {
		this.setState( getState() );
	},

	toggleMenu: function( event ) {
		event.preventDefault();
		this.setState( { isMenuOpen: ! this.state.isMenuOpen } );
	},

	render: function() {
		let menu = this.state.data.map( function( item, i ) {
			return <MenuItem item={ item } key={ i } />
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

export default Navigation;
