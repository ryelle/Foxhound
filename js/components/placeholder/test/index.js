import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Internal
import Placeholder from '../';

describe( 'Placeholder', function() {
	it( 'should load a .placeholder', function() {
		const placeholder = shallow( <Placeholder /> );
		expect( placeholder.is( '.placeholder' ) ).to.be.true;
	} );
} );
