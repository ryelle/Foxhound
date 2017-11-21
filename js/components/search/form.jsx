/** @format */
/**
 * External Dependencies
 */
import React from 'react';

class SearchForm extends React.Component {
	setInput = input => {
		this.input = input;
	};

	getValue = () => {
		return this.input.value;
	};

	render() {
		return (
			<form role="search" className="search-form" onSubmit={ this.props.onSubmit }>
				<div className="search-form-field">
					<label htmlFor="searchform">Search</label>
					<input
						id="searchform"
						ref={ this.setInput }
						type="search"
						className="search-field"
						name="s"
						title="Search"
						defaultValue={ this.props.initialSearch }
					/>
					<input type="submit" className="search-submit" value="Go" />
				</div>
			</form>
		);
	}
}

export default SearchForm;
