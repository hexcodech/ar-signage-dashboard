import React from "react";

import Header from "js/components/Header";
import Carousel from "js/components/Carousel";
import Hints from "js/components/Hints";

import "./Layout.scss";

const Layout = () => {
	return (
		<div styleName="layout">
			<Header />
			<Carousel />
			<Hints />
		</div>
	);
};

export default Layout;
