import React, {useCallback, useMemo} from 'react';
import cx from 'classnames';
import './Questions.css';
import Bg from './Bg';

type QuestionsTypes = {
	currentQuestion: {
		question: string;
		options: string[];
	};
	isSelected: boolean;
	selectedOption: string;
	isCorrectAnswer: boolean;
	handleNextQuestion: (option: string) => void;
};

const Questions = React.memo(
	({
		 currentQuestion,
		 isSelected,
		 selectedOption,
		 isCorrectAnswer,
		 handleNextQuestion,
	 }: QuestionsTypes) => {

		const handleClick = useCallback(
			(option: string) => {
				handleNextQuestion(option);
			},
			[handleNextQuestion]
		);

		const optionLetters = useMemo(() => ['A', 'B', 'C', 'D'], []);

		return (
			<div className="game-questions">
				<h1 className="game-questions__title">{currentQuestion.question}</h1>
				<div className="game-questions-container">
					{currentQuestion.options.map((option: string, index: number) => (
						<button
							key={option}
							className={cx('game-questions__item', {
								[`game-questions__item_color_selected`]: isSelected && selectedOption === option,
								[`game-questions__item_color_correct`]: isCorrectAnswer && !isSelected && selectedOption === option,
								[`game-questions__item_color_wrong`]: !isCorrectAnswer && !isSelected && selectedOption === option,
							})}
							disabled={selectedOption !== ''}
							onClick={() => {
								handleClick(option);
							}}
						>
							<Bg className="game-questions__bg" />

							<div className="game-questions__text">
								<span className="game-questions__letter">{optionLetters[index]}</span> {option}
							</div>
						</button>
					))}
				</div>
			</div>
		);
	}
);

export default Questions;
