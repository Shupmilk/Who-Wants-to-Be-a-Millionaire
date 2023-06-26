import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {resetGame} from '../redux/actions/gameActions';
import Layout from '../ui/layout/Layout';

const GameOver: React.FC = () => {
	const dispatch = useDispatch();
	const totalRewards = useSelector((state: RootState['game']) => state.totalRewards);

	const handleResetGameValues = useCallback(() => {
		dispatch(resetGame());
	}, [dispatch]);

	return (
		<Layout
			title={`$${totalRewards} earned`}
			subtitle="Total score:"
			link={{
				to: '/game',
				text: 'Try again',
				onClick: handleResetGameValues,
			}}
			isBgLight
		/>
	)
};

export default GameOver;
