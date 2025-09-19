import { Route, Routes } from "react-router-dom";
import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { BenefitsSection } from "../sections/BenefitsSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { NewslettersSection } from "../sections/NewslettersSection";

export const Home = () => {
	return (
		<div className="">
			<Hero />

			<Container>
				<BenefitsSection />
				<TestimonialsSection />
				<NewslettersSection />
			</Container>
		</div>
	);
};
