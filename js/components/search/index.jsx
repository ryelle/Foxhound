// External dependencies
import React from 'react';
import classNames from 'classnames';

let SearchForm = React.createClass( {
	getValue: function() {
		return this.refs.input.value;
	},
	render: function() {
		return (
			<form role="search" className="search-form">
				<label>
					<span className="screen-reader-text">Search for:</span>
					<input ref='input' type="search" className="search-field" placeholder="Search …" name="s" title="Search for:" onChange={ this.props.onChange } />
				</label>
				<input type="submit" className="search-submit" value="Search" />
			</form>
		);
	}
} );

export default SearchForm;
