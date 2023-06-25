import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {resetGame} from '../redux/actions/gameActions';
import Layout from '../ui/layout/Layout';

const GameOver: React.FC = () => {
	const dispatch = useDispatch();
	const totalRewards = useSelector((state: RootState['game']) => state.totalRewards);

	const handleResetGameValues = () => {
		dispatch(resetGame());
	}

	return (
		<Layout
			title={`$${totalRewards} earned`}
			subtitle="Total score:"
			link={{
				to: '/game',
				text: 'Try again',
				onClick: handleResetGameValues,
			}}
		/>
	)
};

export default GameOver;
