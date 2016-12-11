import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Internal
import Pagination from '../archive';

describe( 'Pagination', function() {
	it( 'should load a .navigation', function() {
		const navigation = shallow( <Pagination path="/" current={ 1 } isFirstPage={ true } isLastPage={ false } /> );
		expect( navigation.is( '.navigation' ) ).to.be.true;
	} );

	it( 'should have both "Next Page" and "Previous Page" link', function() {
		const navigation = shallow( <Pagination path="/" current={ 1 } isFirstPage={ false } isLastPage={ false } /> );
		expect( navigation.find( '.nav-previous' ).length ).to.equal( 1 );
		expect( navigation.find( '.nav-next' ).length ).to.equal( 1 );
	} );

	it( 'should only have "Next Page" link if this is the first page', function() {
		const navigation = shallow( <Pagination path="/" current={ 1 } isFirstPage={ true } isLastPage={ false } /> );
		expect( navigation.find( '.nav-previous' ).length ).to.equal( 0 );
		expect( navigation.find( '.nav-next' ).length ).to.equal( 1 );
	} );

	it( 'should only have "Previous Page" link if this is the last page', function() {
		const navigation = shallow( <Pagination path="/" current={ 1 } isFirstPage={ false } isLastPage={ true } /> );
		expect( navigation.find( '.nav-previous' ).length ).to.equal( 1 );
		expect( navigation.find( '.nav-next' ).length ).to.equal( 0 );
	} );
} );
