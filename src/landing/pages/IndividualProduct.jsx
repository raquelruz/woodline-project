import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const IndividualProduct = ({ children }) => {
	const navigate = useNavigate();

	return (
		<section className="min-h-screen bg-white text-gray-800 px-4 md:px-10 py-8">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-6">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
					>
						<IoArrowBackCircleOutline className="text-3xl" />
						<span className="font-semibold text-lg">Volver</span>
					</button>
				</div>

				<div className="bg-white p-2 md:p-10">
					{children}
				</div>
			</div>
		</section>
	);
};
