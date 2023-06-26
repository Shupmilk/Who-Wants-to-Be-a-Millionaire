import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Provider} from 'react-redux';
import store from './redux/store/store';
import Game from './pages/Game';
import GameStart from './pages/GameStart';
import GameOver from './pages/GameOver';
import './index.css';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<GameStart/>} />
				<Route path="/game" element={<Game />} />
				<Route path="/game-over" element={<GameOver/>} />
			</Routes>
		</Provider>
	);
};

export default App;
