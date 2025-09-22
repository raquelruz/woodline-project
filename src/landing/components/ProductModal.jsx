import React from "react";

export const ProductModal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
			onClick={handleOverlayClick}
		>
			<div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-6">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl font-bold"
				>
					×
				</button>
				{children}
			</div>
		</div>
	);
};
