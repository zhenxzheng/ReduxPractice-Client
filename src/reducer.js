import {List, Map} from 'immutable';

function setConnectionStatus(state, connectionStatus, connected) {
	return state.set('connection', Map({
		status: connectionStatus,
		connected
	}));
}

function setState(state, newState) {
	return state.merge(newState);
}

function vote(state, entry) {
	const currentRound = state.getIn(['vote', 'round']);
	const currentPair = state.getIn(['vote', 'pair']);
	if (currentPair && currentPair.includes(entry)) {
		return state.set('myVote', Map({
			round: currentRound, // previous round in new state
			entry
		}));
	} else {
		return state;
	}
}

function resetVote(state) {
	const previousRound = state.getIn(['myVote', 'round']);
	const currentRound = state.getIn(['vote', 'round']);

	if (previousRound !== currentRound) {
		return state.remove('myVote');
	} else {
		return state;
	}
}

export default function(state = Map(), action) {
	switch (action.type) {
	case 'SET_STATE':
		return resetVote(setState(state, action.state));
	case 'VOTE':
		return vote(state, action.entry);
	case 'SET_CLIENT_ID':
		return state.set('clientId', action.clientId);
	case 'SET_CONNECTION_STATUS':
		return setConnectionStatus(state, action.status, action.connected);
	}
	return state;
}