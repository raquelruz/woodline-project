import { forwardRef, memo, type ForwardedRef, type InputHTMLAttributes } from "react";

type AppInputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(
	forwardRef<HTMLInputElement, AppInputProps>((props: AppInputProps, ref: ForwardedRef<HTMLInputElement>) => {
		const { className, ...rest } = props;

		return (
			<input
				{...rest}
				ref={ref}
				className={`bg-white border border-gray-300 placeholder:text-primary-light rounded-xl py-3 px-6  focus:text-primary transition ${className ?? ""}`}
			/>
		);
	}),
);
