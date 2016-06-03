/*global FoxhoundMenu */
// External dependencies
import React from 'react';
import classNames from 'classnames';

const SubMenu = ( { items, onClick } ) => {
	let menu = items.map( function( item, i ) {
		return <MenuItem item={ item } key={ i } onClick={ onClick } />
	} );

	return (
		<ul className="sub-menu">
			{ menu }
		</ul>
	);
}

// onClick={ this.blur } onFocus={ this.toggleFocus } onBlur={ this.toggleFocus }
const MenuItem = ( { item, onClick } ) => {
	let re;
	if ( location.pathname !== '/' ) {
		re = new RegExp( location.pathname + '$' );
	} else {
		re = new RegExp( location.hostname + '/$' );
	}
	const classes = classNames( {
		'menu-item': true,
		'menu-item-has-children': item.children.length,
		'current-menu-item': ( location.pathname === item.url ) || re.test( item.url ),
		'current-menu-ancestor': false,
		'current-menu-parent': false,
	}, item.classes );

	const onClickEvent = ( event ) => {
		event.preventDefault();
		onClick( item.url );
	};

	return (
		<li className={ classes } aria-haspopup={ item.children.length > 0 }>
			<a onClick={ onClickEvent } href={ item.url }>{ item.title }</a>
			{ item.children.length ?
				<SubMenu items={ item.children } onClick={ onClick }/> :
				null
			}
		</li>
	);
}

const Navigation = React.createClass( {
	getInitialState() {
		return {
			isMenuOpen: false,
		}
	},

	toggleMenu( event ) {
		event.preventDefault();
		this.setState( { isMenuOpen: ! this.state.isMenuOpen } );
	},

	render() {
		let menu = FoxhoundMenu.data.map( ( item, i ) => {
			return <MenuItem item={ item } key={ i } onClick={ this.props.onClick } />
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
