import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./landing/components/Navbar";
import { Home } from "./landing/pages/Home";
import { Footer } from "./landing/sections/Footer";
import { Products } from "./landing/pages/Products";
import { Categories } from "./landing/pages/Categories";
import { About } from "./landing/pages/About";
import { Contact } from "./landing/pages/Contact";

export const App = () => {
	return (
		<div>
			<Navbar />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/categories" element={<Categories />} />
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
