import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import {
	setCurrentQuestionIndex,
	answerQuestion,
	nextQuestion,
	gameOver,
} from '../redux/actions/gameActions';
import './Game.css';

const Game = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentQuestionIndex = useSelector((state: RootState['game']) => state.currentQuestionIndex);
	const questions = useSelector((state: RootState['game']) => state.questions);
	const [selectedOption, setSelectedOption] = useState('');
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		if (currentQuestionIndex >= questions.length) {
			dispatch(gameOver());
			navigate('/game-over');
		}
	}, [currentQuestionIndex, dispatch, navigate, questions]);

	const handleNextQuestion = useCallback(
		(option: string) => {
			setIsSelected(true);
			setSelectedOption(option);

			setTimeout(() => {
				setIsSelected(false);
				if (option) {
					const currentQuestion = questions[currentQuestionIndex];
					const isAnswerCorrect = currentQuestion.correctAnswers.includes(option);

					if (isAnswerCorrect) {
						setIsCorrectAnswer(true);
						setTimeout(() => {
							dispatch(answerQuestion(option));
							dispatch(setCurrentQuestionIndex(currentQuestionIndex));
							dispatch(nextQuestion());
							setSelectedOption('');
						}, 500);
					}

					if (!isAnswerCorrect) {
						setIsCorrectAnswer(false);
						setTimeout(() => {
							navigate('/game-over');
						}, 1000);
					}
				}
			}, 1000);
		},
		[currentQuestionIndex, dispatch, navigate, questions]
	);

	const currentQuestion = questions[currentQuestionIndex];

	const rewards = [...questions].reverse();

	const optionLetters = ['A', 'B', 'C', 'D'];

	return (
		<main className="game">
			<section className="game__col game__col_left">
				{currentQuestion && (
					<div className="game-questions">
						<h1 className="game-questions__title">{currentQuestion.question}</h1>
						<div className="game-questions-container">
							{currentQuestion.options.map((option: string, index: number) => (
								<button
									key={option}
									className={cx(`game-questions__item`, {
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
				)}
			</section>
			<section className="game__col game__col_right">
				<div className="game-rewards">
					<ul className="game-rewards-list">
						{rewards.map(({ reward }) => (
							<li
								key={reward}
								className="game-rewards-list__item"
							>
								${reward}
							</li>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default Game;
