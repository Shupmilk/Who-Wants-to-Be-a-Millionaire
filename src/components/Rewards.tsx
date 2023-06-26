import React, { useMemo } from 'react';
import cx from 'classnames';
import { GameConfigTypes } from '../redux/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Bg from './Bg';
import './Rewards.css';

type RewardsTypes = {
	rewards: GameConfigTypes[];
};

const Rewards = ({ rewards }: RewardsTypes) => {
	const currentQuestionIndex = useSelector(
		(state: RootState['game']) => state.currentQuestionIndex
	);

	const reversedIndex = useMemo(() => rewards.length - 1 - currentQuestionIndex, [
		currentQuestionIndex,
		rewards.length,
	]);

	return (
		<div className="game-rewards">
			<ul className="game-rewards-list">
				{rewards.map(({ reward }, index) => {
					return (
						<li
							key={reward}
							className={cx('game-rewards-list__item', {
								'game-rewards-list__item_current': index === reversedIndex,
								'game-rewards-list__item_passed': index > reversedIndex,
							})}
						>
							<Bg className="game-rewards-list__item-bg" />
							${reward}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Rewards;
