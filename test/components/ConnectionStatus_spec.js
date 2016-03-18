import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {ConnectionStatus} from '../../src/components/connectionStatus';
import {expect} from 'chai';

describe('ConnectionStatus', () => {

	it('is not visible when connected', () => {
		const component = renderIntoDocument(<ConnectionStatus connected={true} />);
		expect(
			ReactDOM.findDOMNode(component.refs.connectionStatus).style.display)
			.to.equal('none');
	});

	it('is visible when not connected', () => {
		const component = renderIntoDocument(<ConnectionStatus connected={false} />);
		expect(
			ReactDOM.findDOMNode(component.refs.connectionStatus).style.display)
			.to.equal('block');
	});

	it('contains a connection status message', () => {
		const component = renderIntoDocument(<ConnectionStatus connected={false} status="Fail" />);
		expect(
			ReactDOM.findDOMNode(component.refs.connectionStatus).textContent)
			.to.contain('Fail');
	});
});