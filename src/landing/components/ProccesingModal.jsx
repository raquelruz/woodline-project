export const ProcessingModal = ({ isOpen }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
				<svg
					className="animate-spin h-10 w-10 text-primary-pressed mb-4"
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
				<p className="text-lg font-semibold text-gray-700">Procesando...</p>
			</div>
		</div>
	);
};
