import "./App.css";
import { Home } from "./landing/pages/Home";
import { Header } from "./landing/components/Header";
import { Navbar } from "./landing/components/Navbar";
import { Hero } from "./landing/sections/Hero";
import { Footer } from "./landing/sections/Footer";

export const App = () => {
	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
				{/* <Home /> */}

				<Hero />
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
