import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./landing/components/Navbar";
import { Home } from "./landing/pages/Home";

export const App = () => {
	return (
		<div>
			<Navbar />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</main>
		</div>
	);
};
