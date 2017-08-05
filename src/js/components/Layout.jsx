import React from "react";

import Header from "./Header";
import Carousel from "./Carousel";

import "./Layout.scss";

const Layout = () => {
	return (
		<div styleName="layout">
			<Header />
			<Carousel />
		</div>
	);
};

export default Layout;
