import { forwardRef, memo } from "react";

export const Input = memo(
	forwardRef((props, ref) => {
		return (
			<input
				{...props}
				ref={ref}
				className={`bg-white border border-gray-300 placeholder:text-primary-light rounded-xl py-3 px-6 
            focus:text-primary transition ${props.className}`}
			/>
		);
	})
);
