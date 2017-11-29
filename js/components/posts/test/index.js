/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import * as router from 'react-router-dom';

/**
 * Internal Dependencies
 */
import { mockStore } from 'test/mock-store';
import { data } from './fixtures/store';
import Index from '../';

describe( 'Index', function() {
	let RenderedIndex;
	let wrapper;

	beforeEach( () => {
		const store = mockStore( data );
		sinon.stub( router, 'Link' ).returns( <span /> );

		// Pass through `match` & `location`, which would come from react-router
		wrapper = mount(
			<Provider store={ store }>
				<Index match={ { params: {} } } location={ { search: '' } } />
			</Provider>
		);

		RenderedIndex = wrapper.find( Index );
	} );

	afterEach( () => {
		router.Link.restore();
		wrapper.unmount();
	} );

	it( 'should load an index component', function() {
		expect( RenderedIndex.length ).to.equal( 1 );
	} );

	it( 'should contain two posts', function() {
		expect( RenderedIndex.find( '.entry' ).length ).to.equal( 2 );
	} );
} );
