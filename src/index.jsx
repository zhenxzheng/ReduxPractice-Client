import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionStatus} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const socket = io(`${location.protocol}//${location.hostname}:3000`);
socket.on('state', state =>
	store.dispatch(setState(state))
);

[
	'connect',
	'connect_error',
	'connect_timeout',
	'reconnect',
	'reconnecting',
	'reconnect_error',
	'reconnect_failed'
].forEach(ev =>
	socket.on(ev, () => store.dispatch(setConnectionStatus(ev, socket.connected)))
);

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

const routes = 
	<Route components={App}>
		<Route path="/results" components={ResultsContainer} />
		<Route path="/" component={VotingContainer} />
	</Route>;

ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);