// gameReducer.js

import { ActionTypes } from '../actions/gameActions';
import gameConfig from '../../data/gameConfig.json'

const initialState = {
	currentQuestionIndex: 0,
	questions: gameConfig,
	gameOver: false,
	totalRewards: 0,
};

const gameReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionTypes.SET_CURRENT_QUESTION_INDEX:
			return {
				...state,
				currentQuestionIndex: action.payload,
			};
		case ActionTypes.ANSWER_QUESTION:
			const { currentQuestionIndex, questions, totalRewards } = state;
			const currentQuestion = questions[currentQuestionIndex];
			const isAnswerCorrect = currentQuestion.correctAnswers.includes(action.payload);
			const reward = isAnswerCorrect ? currentQuestion.reward : 0;

			return {
				...state,
				totalRewards: totalRewards + Number(reward),
			};
		case ActionTypes.NEXT_QUESTION:
			return {
				...state,
				currentQuestionIndex: state.currentQuestionIndex + 1,
			};
		case ActionTypes.GAME_OVER:
			return {
				...state,
				gameOver: true,
			};
		case ActionTypes.RESET_GAME:
			return initialState;
		default:
			return state;
	}
};

export default gameReducer;
