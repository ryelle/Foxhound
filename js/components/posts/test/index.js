import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';

// Internal
import { mockStore } from 'test/mock-store';
import { data } from './fixtures/store';
import Index from '../';

describe( 'Index', function() {
	let RenderedIndex;

	beforeEach( () => {
		const store = mockStore( data );

		// Pass through `params` & `location`, which would come from react-router
		const wrapper = mount(
			<Provider store={ store }>
				<Index params={ {} } location={ { query: {} } } />
			</Provider>
		);

		RenderedIndex = wrapper.find( Index );
	} );

	it( 'should load an index component', function() {
		expect( RenderedIndex.length ).to.equal( 1 );
	} );

	it( 'should contain two posts', function() {
		expect( RenderedIndex.find( '.entry' ).length ).to.equal( 2 );
	} );
} );
