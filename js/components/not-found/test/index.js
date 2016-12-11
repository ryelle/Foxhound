import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Internal
import NotFound from '../';

describe( 'NotFound', function() {
	it( 'should load a .entry-404', function() {
		const navigation = shallow( <NotFound /> );
		expect( navigation.is( '.entry-404' ) ).to.be.true;
	} );
} );
