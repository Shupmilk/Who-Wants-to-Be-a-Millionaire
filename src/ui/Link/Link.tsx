import React from 'react';
import {NavLink} from 'react-router-dom';
import './Link.css';

type LinkTypes = {
	to: string,
	text: string,
	onClick?: () => void,
}

const Link = ({to, text, onClick}: LinkTypes) => {
	return (
		<NavLink to={to} className="link" onClick={onClick}>
			{text}
		</NavLink>
	);
};

export default Link;
