import { useTranslate } from "../../translations/useTranslate";
import { Loader } from "./Loader";

type PageSpinnerProps = {
	message?: string;
	size?: "sm" | "md" | "lg" | "xl" | string;
	color?: string;
	className?: string;
	containerClassName?: string;
	fullPage?: boolean;
};

export const PageSpinner = ({
	message,
	size = "xl",
	color = "primary",
	className = "",
	fullPage = false,
	containerClassName = "",
}: PageSpinnerProps) => {
	const { t } = useTranslate();
	const baseContainerClasses = "flex items-center justify-center";

	const containerClasses = fullPage
		? `${baseContainerClasses} min-h-screen ${containerClassName}`
		: `${baseContainerClasses} py-12 ${containerClassName}`;

	const finalMessage = message ?? t("common.loading");

	return (
		<div className={containerClasses}>
			<div className="text-center">
				<Loader size={size} color={color} message={finalMessage} className={`mx-auto ${className}`} />{" "}
			</div>
		</div>
	);
};
