import React from 'react';
import './Rewards.css';
import {GameConfigTypes} from '../redux/types/types';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import cx from 'classnames';

type RewardsTypes = {
	rewards: GameConfigTypes[],
};

const Rewards = ({rewards}: RewardsTypes) => {
	const currentQuestionIndex = useSelector((state: RootState['game']) => state.currentQuestionIndex);

	return (
		<div className="game-rewards">
			<ul className="game-rewards-list">
				{rewards.map(({ reward }, index) => {
					return (
						<li
							key={reward}
							className={cx('game-rewards-list__item', {
								[`game-rewards-list__item_current`]: index === rewards.length - 1 - currentQuestionIndex,
								[`game-rewards-list__item_passed`]: index > rewards.length - 1 - currentQuestionIndex,
							})}
						>
							<svg
								width="421"
								height="40"
								viewBox="0 0 405 72"
								xmlns="http://www.w3.org/2000/svg"
								className="game-rewards-list__bg"
							>
								<path d="M388 36L405 36" />
								<path d="M0 36L17 36" />
								<path d="M48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5Z"/>
							</svg>
							${reward}
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Rewards;
