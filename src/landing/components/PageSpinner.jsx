import { Loader } from "./Loader";

export const PageSpinner = ({
	message = "Cargando...",
	size = "xl",
	color = "primary",
	className = "",
	fullPage = false,
	containerClassName = "",
}) => {
	const baseContainerClasses = "flex items-center justify-center";

	const containerClasses = fullPage
		? `${baseContainerClasses} min-h-screen ${containerClassName}`
		: `${baseContainerClasses} py-12 ${containerClassName}`;

	return (
		<div className={containerClasses}>
			<div className="text-center">
				<Loader size={size} color={color} className={`mx-auto ${className}`} />{" "}
			</div>
		</div>
	);
};
