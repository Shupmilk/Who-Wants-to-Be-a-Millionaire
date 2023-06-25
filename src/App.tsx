import React from 'react';
import {Routes, Route} from "react-router-dom"
import {Provider} from 'react-redux';
import store from './redux/store/store';
import Game from './components/Game';
import GameStart from './components/GameStart';
import GameOver from './components/GameOver';
import './index.css';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<GameStart/>} />
				<Route path="/game" element={<Game/>} />
				<Route path="/game-over" element={<GameOver/>} />
			</Routes>
		</Provider>
	);
};

export default App;
