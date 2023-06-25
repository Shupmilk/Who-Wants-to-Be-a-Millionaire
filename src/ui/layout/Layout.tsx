import React from 'react';
import Link from '../Link/Link';
import './Layout.css';

const thumb: string = require("../../assets/thumb.svg").default;

type LayoutProps = {
	title: string,
	subtitle?: string,
	link: {
		to: string,
		text: string,
		onClick?: () => void,
	},
};

const Layout = ({title, subtitle, link}: LayoutProps) => {
	return (
		<section className="layout">
			<div className="layout-container">
				<div className="layout__col layout__col_left">
					<img src={thumb} alt="thumb" className="layout__image" />
				</div>
				<div className="layout__col layout__col_right">
					<div className="layout__heading">
						{subtitle && (
							<h3 className="layout__subtitle">
								{subtitle}
							</h3>
						)}
						<h1 className="layout__title">
							{title}
						</h1>
					</div>
					<Link to={link.to} text={link.text} onClick={link.onClick} />
				</div>
			</div>
		</section>
	);
};

export default Layout;
