// src/components/ui/LoadingButton.jsx
export const LoadingButton = ({
	onClick,
	loading = false,
	disabled = false,
	children,
	loadingText = "Procesando...",
	className = "",
}) => {
	let buttonContent;

	if (loading) {
		buttonContent = (
			<span className="flex items-center gap-2">
				<svg
					className="animate-spin h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
					></path>
				</svg>
				{loadingText}
			</span>
		);
	} else {
		buttonContent = children;
	}

	return (
		<button
			onClick={onClick}
			disabled={loading || disabled}
			className={`w-full bg-primary-hover text-white py-3 rounded-lg font-semibold hover:bg-primary-pressed transition disabled:opacity-50 flex justify-center items-center ${className}`}
		>
			{buttonContent}
		</button>
	);
};
