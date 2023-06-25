import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setCurrentQuestionIndex, answerQuestion, nextQuestion, gameOver, resetGame} from '../redux/actions/gameActions';
import {RootState} from '../redux/store';
import './Game.css';

const Game = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentQuestionIndex = useSelector((state: RootState['game']) => state.currentQuestionIndex);
	const questions = useSelector((state: RootState['game']) => state.questions);
	const totalRewards = useSelector((state: RootState['game']) => state.totalRewards);
	const [selectedOption, setSelectedOption] = useState('');
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);

	useEffect(() => {
		if (currentQuestionIndex >= questions.length) {
			dispatch(gameOver());
			navigate('/game-over');
		}
	}, [currentQuestionIndex, dispatch, navigate, questions.length]);

	const handleNextQuestion = () => {
		if (selectedOption) {
			const currentQuestion = questions[currentQuestionIndex];
			const isAnswerCorrect = currentQuestion.correctAnswers.includes(selectedOption);

			if (isAnswerCorrect) {
				dispatch(answerQuestion(selectedOption));
				setSelectedOption('');
				dispatch(nextQuestion());
				dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
			} else {
				// setIsCorrectAnswer(false);
				setTimeout(() => {
					setSelectedOption('');
					// setIsCorrectAnswer(true);
					dispatch(resetGame()); // Reset the game state
					navigate('/game-over');
				}, 2000);
			}
		}
	};


	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
	};

	const currentQuestion = questions[currentQuestionIndex];

	const rewards = ['$500', '$1000', '$2000'];

	return (
		<main className="game">
			<section className="game-questions">
				{currentQuestion && (
					<>
						<h1>Question {currentQuestionIndex + 1}</h1>
						<div>
							<p>{currentQuestion.question}</p>
							<div>
								{currentQuestion.options.map((option: string, index: number) => (
									<button
										key={index}
										// onClick={() => {
										// 	handleOptionSelect(option);
										// 	handleNextQuestion();
										// }}
										onClick={() => handleOptionSelect(option)}
										disabled={selectedOption !== ''}
									>
										{option}
									</button>
								))}
							</div>
							<button onClick={handleNextQuestion} disabled={selectedOption === ''}>
								Next Question
							</button>
						</div>
					</>
				)}
			</section>
			<section className="game-rewards">
				<ul>
					{rewards.map((reward) => (
						<li key={reward}>{reward}</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default Game;
