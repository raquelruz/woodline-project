import { memo, useMemo, type ReactNode } from "react";

type PageError = {
	title: string;
	message: string;
	icon?: ReactNode;
	onRetry?: () => void;
	retryText?: string;
	className?: string;
	containerClassName?: string;
	fullPage?: boolean;
}

export const PageError = memo(
	({
		title = "Error al cargar los datos",
		message = "Ha ocurrido un error inesperado.",
		icon = "⚠️",
		onRetry,
		retryText = "Reintentar",
		className,
		containerClassName,
		fullPage = false,
	}: PageError) => {
		const containerClasses = useMemo(() => {
			const base = "w-full flex items-center justify-center";
			return fullPage ? `${base} min-h-screen` : `${base} py-12`;
		}, [fullPage]);

		return (
			<div className={`${containerClasses} ${containerClassName || ""}`}>
				<div
					className={`
						w-full text-center flex flex-col items-center
						${className || ""}   /* se añade, no reemplaza */
					`}
				>
					<div className="text-4xl mb-4 text-error">{icon}</div>

					<h3 className="text-lg font-semibold text-error mb-2">{title}</h3>

					{message && <p className="text-sm text-gray-500 mb-6 w-full mx-auto">{message}</p>}

					{onRetry && (
						<button
							onClick={onRetry}
							className="px-4 py-2 bg-error text-white rounded-md hover:bg-red-900 transition"
						>
							{retryText}
						</button>
					)}

					<button
						className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
						onClick={() => (window.location.href = "/")}
					>
						Volver al inicio
					</button>
				</div>
			</div>
		);
	}
);
