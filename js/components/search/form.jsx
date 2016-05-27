// External dependencies
import React from 'react';

const SearchForm = React.createClass( {
	getValue() {
		return this.refs.input.value;
	},

	render() {
		return (
			<form role="search" className="search-form">
				<label>
					<span className="screen-reader-text">Search for:</span>
					<input ref='input' type="search" className="search-field" placeholder="Search …" name="s" title="Search for:" onChange={ this.props.onChange } defaultValue={ this.props.initialSearch } />
				</label>
				<input type="submit" className="search-submit" value="Search" />
			</form>
		);
	}
} );

export default SearchForm;
