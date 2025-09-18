import "./App.css";
import { Home } from "./landing/pages/Home";
import { Header } from "./landing/components/Header";
import { Hero } from "./landing/sections/Hero";
import { Footer } from "./landing/sections/Footer";
import { Route, Routes } from "react-router-dom";

export const App = () => {
	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />}/>
				</Routes>
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
