import { useTranslate } from "../../translations/useTranslate";
import { Loader } from "./Loader";

export const PageSpinner = ({
	message = t("common.loading"),
	size = "xl",
	color = "primary",
	className = "",
	fullPage = false,
	containerClassName = "",
}) => {
	const { t } = useTranslate();
	const baseContainerClasses = "flex items-center justify-center";

	const containerClasses = fullPage
		? `${baseContainerClasses} min-h-screen ${containerClassName}`
		: `${baseContainerClasses} py-12 ${containerClassName}`;

	return (
		<div className={containerClasses}>
			<div className="text-center">
				<Loader size={size} color={color} message={message} className={`mx-auto ${className}`} />{" "}
			</div>
		</div>
	);
};
