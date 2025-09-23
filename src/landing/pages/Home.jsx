import { Route, Routes } from "react-router-dom";
import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { BenefitsSection } from "../sections/BenefitsSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { NewslettersSection } from "../sections/NewslettersSection";
import { CategoriesSection } from "../sections/CategoriesSection";

export const Home = () => {
	return (
		<div className="">
			<Hero />

			<Container>
				<CategoriesSection />
				<BenefitsSection />
				<TestimonialsSection />
				<NewslettersSection />
			</Container>
		</div>
	);
};
