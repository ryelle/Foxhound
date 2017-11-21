/*global FoxhoundSettings */
// External dependencies
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getMenu } from 'wordpress-query-menu/lib/selectors';

// Internal dependencies
import { toggleFocus } from 'utils/a11y';

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

class Navigation extends React.Component {
    state = {
        isMenuOpen: false,
        selected: this.props.currentPage,
    };

    toggleMenu = (event) => {
		event.preventDefault();
		this.setState( { isMenuOpen: ! this.state.isMenuOpen } );
	};

    render() {
		if ( this.props.menu.length < 1 ) {
			return null;
		}

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
					<button onClick={ this.toggleMenu } aria-expanded={ !! this.state.isMenuOpen }>Menu</button>
				</div>
				<ul className="menu nav-menu" aria-expanded={ !! this.state.isMenuOpen }>
					{ menu }
				</ul>
			</div>
		);
	}
}

export default connect( ( state ) => {
	const path = FoxhoundSettings.URL.path || '/';
	const menu = getMenu( state, 'primary' );
	return {
		currentPage: state.routing.locationBeforeTransitions.pathname || path,
		menu: menu || [],
	};
} )( Navigation );
