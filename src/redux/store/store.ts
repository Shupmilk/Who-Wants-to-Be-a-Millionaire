import { createStore, compose, Store } from 'redux';
import gameReducer from '../reducers/gameReducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(gameReducer, composeEnhancers());

export default store;

