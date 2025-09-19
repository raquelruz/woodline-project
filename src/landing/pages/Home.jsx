import { Route, Routes } from "react-router-dom";
import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { BenefitsSection } from "../sections/BenefitsSection";

export const Home = () => {
	return (
		<div className="">
			<Hero />

			<Container>
				<BenefitsSection />
			</Container>
		</div>
	);
};
