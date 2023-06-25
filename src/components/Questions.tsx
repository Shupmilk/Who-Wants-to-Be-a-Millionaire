import React from 'react';
import cx from 'classnames';
import './Questions.css';

type QuestionsTypes = {
	currentQuestion: {
		question: string,
		options: string[],
	},
	isSelected: boolean,
	selectedOption: string,
	isCorrectAnswer: boolean,
	handleNextQuestion: (option: string) => void,
}

const Questions = ({currentQuestion, isSelected, selectedOption, isCorrectAnswer, handleNextQuestion}: QuestionsTypes) => {
	const optionLetters = ['A', 'B', 'C', 'D'];

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
							handleNextQuestion(option);
						}}
					>
						<svg
							width="421"
							height="72"
							viewBox="0 0 405 72"
							xmlns="http://www.w3.org/2000/svg"
							className="game-questions__bg"
						>
							<path d="M388 36L405 36" />
							<path d="M0 36L17 36" />
							<path d="M48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5Z"/>
						</svg>

						<div className="game-questions__text">
							<span className="game-questions__letter">{optionLetters[index]}</span> {option}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default Questions;
