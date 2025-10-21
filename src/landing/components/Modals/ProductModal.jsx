import { IoCloseCircleOutline } from "react-icons/io5";

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

			<div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] relative overflow-hidden flex flex-col">
				

				<IoCloseCircleOutline
					onClick={onClose}
					className="absolute top-2 right-6 text-primary hover:text-primary-light text-3xl font-extrabold z-10"
					aria-label="Cerrar"
				>
					×
				</IoCloseCircleOutline>

				<div className="overflow-y-auto px-6 py-8 md:px-10 md:py-10">
					{children}
				</div>
			</div>
		</div>
	);
};
