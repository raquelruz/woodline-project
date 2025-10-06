export const ProductModal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;
	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) onClose();
	};
	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
			onClick={handleOverlayClick}
		>
			<div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-6">
				<button
					onClick={onClose}
					className="absolute top-0 right-3 text-primary hover:text-primary-light text-3xl font-extrabold"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};
