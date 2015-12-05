// External dependencies
import React from 'react';
import classNames from 'classnames';

// Internal dependencies
import API from 'utils/api';
import NavigationStore from '../../stores/navigation-store';

/**
 * Method to retrieve state from Stores
 */
function getState() {
	return {
		data: NavigationStore.getMenu(),
	};
}

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
	render: function() {
		let classes = classNames( {
			'menu-item': true,
			'menu-item-has-children': this.props.item.children.length,
			'current-menu-item': false,
			'current-menu-ancestor': false,
			'current-menu-parent': false,
		} );

		return (
			<li className={ classes }>
				<a href={ this.props.item.url }>{ this.props.item.title }</a>
				{ this.props.item.children.length ?
					<SubMenu items={ this.props.item.children } />:
					null
				}
			</li>
		);
	}
} );

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

	render: function() {
		let menu = this.state.data.map( function( item, i ) {
			return <MenuItem item={ item } key={ i } />
		} );

		return (
			<div className="menu-container">
				<ul className="menu nav-menu" aria-expanded="false">
					{ menu }
				</ul>
			</div>
		);
	}
} );

export default Navigation;
