export const Loader = ({ text }) => {
	return (
		<div className="flex flex-col items-center justify-center m-20">
			<svg
				className="animate-spin h-10 w-10 text-primary mb-3"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
				></path>
			</svg>
			<p className="text-gray-500">{text}</p>
		</div>
	);
};
