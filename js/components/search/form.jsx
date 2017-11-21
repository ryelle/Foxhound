// External dependencies
import React from 'react';

class SearchForm extends React.Component {
    getValue = () => {
		return this.refs.input.value;
	};

    render() {
		return (
			<form role="search" className="search-form" onSubmit={ this.props.onSubmit }>
				<div className="search-form-field">
					<label htmlFor="searchform">Search</label>
					<input id="searchform" ref="input" type="search" className="search-field" name="s" title="Search" defaultValue={ this.props.initialSearch } />
					<input type="submit" className="search-submit" value="Go" />
				</div>
			</form>
		);
	}
}

export default SearchForm;
