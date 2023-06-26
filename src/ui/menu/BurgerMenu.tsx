import React, {useCallback, useState} from 'react';
import './BurgerMenu.css';

const menuOpen: string = require("../../assets/menu-open.svg").default;
const menuClose: string = require("../../assets/menu-close.svg").default;

type BurgerMenuProps = {
	component: React.ReactNode;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ component }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleMenu = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	return (
		<div className="burger-menu">
			<button className="burger-menu__button" onClick={handleToggleMenu}>
				<img src={isOpen ? menuClose : menuOpen} alt="menu" />
			</button>
			{isOpen && <div className="burger-menu__content">{component}</div>}
		</div>
	);
};

export default BurgerMenu;



