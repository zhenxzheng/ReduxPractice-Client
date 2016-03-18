import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const ConnectionStatus = React.createClass({
	mixins: [PureRenderMixin],
	isVisible: function() {
		return !this.props.connected;
	},
	getMessage: function() {
		return `Not connected (${this.props.status})`;
	},
	render: function() {
		return <div ref="connectionStatus" className="connectionStatus"
					style={{display: this.isVisible()?'block':'none'}}>
				{this.getMessage()}
		</div>;
	}
});

export const ConnectionStatusContainer = connect(
	status => status.get('connection', Map()).toJS()
)(ConnectionStatus);