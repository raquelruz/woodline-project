import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { Testimonials } from "../sections/Testimonials";
import { Newsletters } from "../sections/Newsletters";
import { Categories } from "../sections/Categories";
import { FeaturedProducts } from "../sections/FeaturedProducts";

export const Home = () => {
	return (
		<div className="">
			<Hero />

			<Container>
				<Categories />
				<FeaturedProducts />
				<Benefits />
				<Testimonials />
				<Newsletters />
			</Container>
		</div>
	);
};
