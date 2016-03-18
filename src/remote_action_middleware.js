import objectAssign from 'object-assign';

export default socket => store => next => action => {
	console.log('in middleware', action);
	if (action.meta && action.meta.remote){
		const clientId = store.getState().get('clientId');
		socket.emit('action', objectAssign({}, action));
		console.log('in emitting');
	}
	return next(action);
}

// ^ above function is a more concise wa of expressing:
//
// export default function(store) {
//   return function(next) {
//     return function(action) {
//     }
//   }
// }