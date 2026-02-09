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
import { useTranslate } from "../../translations/useTranslate"
import type { Product } from "../../core/products/products.types";

type ViewedContextShape = {
	viewed: Product[];
};

const Home = () => {
	const { t } = useTranslate()
	const viewedCtx = useContext(ViewedContext) as ViewedContextShape | null;
	const viewed = viewedCtx?.viewed ?? [];

	return (
		<>
			<Hero />

			<Container>
				<Categories />
				<FeaturedProducts />

				{viewed.length > 0 && (
					<div className="mt-10">
						<h2 className="text-4xl text-center font-title font-extrabold text-gray-800">
							{t("pages.home.recently_seen")}
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