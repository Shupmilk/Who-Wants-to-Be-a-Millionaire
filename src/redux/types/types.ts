export type Question = {
	question: string;
	options: string[];
	correctAnswers: string[];
	reward: number;
};

export type GameState = {
	currentQuestionIndex: number;
	score: number;
	totalRewards: number;
	questions: Question[];
	gameOver: boolean;
};

export interface RootState {
	game: GameState;
}
