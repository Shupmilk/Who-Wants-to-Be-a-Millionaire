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

const Game = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentQuestionIndex = useSelector((state: RootState['game']) => state.currentQuestionIndex);
	const questions = useSelector((state: RootState['game']) => state.questions);
	const [selectedOption, setSelectedOption] = useState('');

	useEffect(() => {
		if (currentQuestionIndex >= questions.length) {
			dispatch(gameOver());
			navigate('/game-over');
		}
	}, [currentQuestionIndex, dispatch, navigate, questions]);

	const handleNextQuestion = useCallback(
		(option: string) => {
			setSelectedOption(option);
			if (option) {
				const currentQuestion = questions[currentQuestionIndex];
				const isAnswerCorrect = currentQuestion.correctAnswers.includes(option);


				if (isAnswerCorrect) {
					dispatch(answerQuestion(option));
					dispatch(setCurrentQuestionIndex(currentQuestionIndex));
					dispatch(nextQuestion());
					setSelectedOption('');
				} else {
					setTimeout(() => {
						navigate('/game-over');
					}, 1000);
				}
			}
		},
		[currentQuestionIndex, dispatch, navigate, questions]
	);

	const currentQuestion = questions[currentQuestionIndex];

	const rewards = [...questions].reverse();

	const optionLetters = ['A', 'B', 'C', 'D'];

	return (
		<main className="game">
			<section className="game-questions">
				{currentQuestion && (
					<>
						<h1 className="game-questions__title">{currentQuestion.question}</h1>
						<div className="game-questions-container">
							{currentQuestion.options.map((option: string, index: number) => (
								<button
									key={option}
									onClick={() => {
										handleNextQuestion(option);
									}}
									disabled={selectedOption !== '' && selectedOption !== option}
									className={`game-questions__item`}
								>
									<span className="game-questions__letter">{optionLetters[index]}</span> {option}
								</button>
							))}
						</div>
					</>
				)}
			</section>
			<section className="game-rewards">
				<ul>
					{rewards.map(({ reward }) => (
						<li key={reward}>${reward}</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default Game;
