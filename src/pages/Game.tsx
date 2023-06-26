import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../redux/store';
import {
	setCurrentQuestionIndex,
	answerQuestion,
	nextQuestion,
	gameOver,
} from '../redux/actions/gameActions';
import Questions from '../components/Questions';
import Rewards from '../components/Rewards';
import BurgerMenu from '../ui/menu/BurgerMenu';
import './Game.css';

const Game = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentQuestionIndex = useSelector(
		(state: RootState['game']) => state.currentQuestionIndex
	);
	const questions = useSelector((state: RootState['game']) => state.questions);
	const [selectedOption, setSelectedOption] = useState('');
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
	const [isSelected, setIsSelected] = useState(false);
	const [shouldDisplayMenu, setShouldDisplayMenu] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];

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
						}, 1000);
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

	useEffect(() => {
		if (currentQuestionIndex >= questions.length) {
			dispatch(gameOver());
			navigate('/game-over');
		}
	}, [currentQuestionIndex, dispatch, navigate, questions]);

	useEffect(() => {
		const handleResize = () => {
			setShouldDisplayMenu(window.innerWidth < 1280);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const reversedRewards = useMemo(() => [...questions].reverse(), [questions]);

	return (
		<main className="game">
			{shouldDisplayMenu && <BurgerMenu component={<Rewards rewards={reversedRewards}/>}/>}
			{currentQuestion && (
				<Questions
					currentQuestion={currentQuestion}
					isSelected={isSelected}
					selectedOption={selectedOption}
					isCorrectAnswer={isCorrectAnswer}
					handleNextQuestion={handleNextQuestion}
				/>
			)}
			{!shouldDisplayMenu && <Rewards rewards={reversedRewards}/>}
		</main>
	);
};

export default Game;
