import "./App.css";
import { Home } from "./landing/pages/Home";
import { Header } from "./landing/components/Header";
import { Hero } from "./landing/sections/Hero";
import { Products } from "./landing/pages/Products";
import { Categories } from "./landing/pages/Categories";
import { About } from "./landing/pages/About";
import { Contact } from "./landing/pages/Contact";
import { Footer } from "./landing/sections/Footer";
import { Route, Routes } from "react-router-dom";

export const App = () => {
	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
