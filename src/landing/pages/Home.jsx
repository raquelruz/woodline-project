import { Container } from "../components/Container";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { Testimonials } from "../sections/Testimonials";
import { Newsletters } from "../sections/Newsletters";
import { Categories } from "../sections/Categories";
import { FeaturedProducts } from "../sections/FeaturedProducts";
import { ViewedList } from "../components/ViewedList";
import { useContext } from "react";
import { ViewedContext } from "../../contexts/ViewedContext";

const Home = () => {
	const { viewed } = useContext(ViewedContext);

	return (
		<>
			<Hero />

			<Container>
				<Categories />
				<FeaturedProducts />

				{viewed.length > 0 && (
					<div className="mt-10">
						<h2 className="text-4xl text-center font-title font-extrabold text-gray-800">
							Visto <span className="text-primary">recientemente</span>
						</h2>
						<ViewedList products={viewed} />
					</div>
				)}

				<Benefits />
				<Testimonials />
				<Newsletters />
			</Container>
		</>
	);
};

export default Home;