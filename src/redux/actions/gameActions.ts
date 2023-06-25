export const ActionTypes = {
	SET_CURRENT_QUESTION_INDEX: 'SET_CURRENT_QUESTION_INDEX',
	ANSWER_QUESTION: 'ANSWER_QUESTION',
	NEXT_QUESTION: 'NEXT_QUESTION',
	GAME_OVER: 'GAME_OVER',
	RESET_GAME: 'RESET_GAME',
};

export function setCurrentQuestionIndex(index: number) {
	return {
		type: ActionTypes.SET_CURRENT_QUESTION_INDEX,
		payload: index,
	};
}

export function answerQuestion(selectedOption: string) {
	return {
		type: ActionTypes.ANSWER_QUESTION,
		payload: selectedOption,
	};
}

export function nextQuestion() {
	return {
		type: ActionTypes.NEXT_QUESTION,
	};
}

export function gameOver() {
	return {
		type: ActionTypes.GAME_OVER,
	};
}

export const resetGame = () => ({
	type: ActionTypes.RESET_GAME,
});
