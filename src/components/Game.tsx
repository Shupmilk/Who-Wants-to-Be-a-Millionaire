import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import {
	setCurrentQuestionIndex,
	answerQuestion,
	nextQuestion,
	gameOver,
} from '../redux/actions/gameActions';
import './Game.css';
import Questions from './Questions';

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

	return (
		<main className="game">
			<section className="game__col game__col_left">
				{currentQuestion && (
					<Questions
						currentQuestion={currentQuestion}
						isSelected={isSelected}
						selectedOption={selectedOption}
						isCorrectAnswer={isCorrectAnswer}
						handleNextQuestion={handleNextQuestion}
					/>
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
