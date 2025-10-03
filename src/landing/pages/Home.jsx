import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { Testimonials } from "../sections/Testimonials";
import { Newsletters } from "../sections/Newsletters";
import { Categories } from "../sections/Categories";

export const Home = () => {
	return (
		<div className="">
			<Hero />

			<Container>
				<Categories />
				<Benefits />
				<Testimonials />
				<Newsletters />
			</Container>
		</div>
	);
};
