import { combineReducers } from 'redux';
import gameReducer from '../reducers/gameReducer';

const rootReducer = combineReducers({
	game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
