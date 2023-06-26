import React from 'react';
import Layout from '../ui/layout/Layout';

const GameStart: React.FC = () => {
	return (
		<Layout
			title="Who wants to be a&nbsp;millionaire?"
			link={{to: '/game', text: 'Start'}}
		/>
	);
};

export default GameStart;
