
export interface RootState {
	game: GameState;
}

export type Question = {
	question: string;
	options: string[];
	correctAnswers: string[];
	reward: number;
};

export type GameState = {
	currentQuestionIndex: number;
	score: number;
	totalRewards: string;
	questions: Question[];
	gameOver: boolean;
};

export type GameConfigTypes = {
	question: string;
	options: string[];
	correctAnswers: string[];
	reward: string;
}

export type InitialStateTypes = {
	currentQuestionIndex: number,
	questions: GameConfigTypes[],
	gameOver: boolean,
	totalRewards: string,
}
