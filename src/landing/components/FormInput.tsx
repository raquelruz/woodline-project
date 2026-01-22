import { memo } from "react";
import { Input } from "./Input";
import type { InputProps, LabelProps } from "../../core/types/types";

type FormInputProps = {
	containerClass?: string;
	input: InputProps;
	label: LabelProps;
};

export const FormInput = memo(({ containerClass = "", input, label }: FormInputProps) => {
    return (
        <div className={containerClass}>
            <label htmlFor={input.name} className={`font-medium text-primary ${label.className}`}>
                {label.text}
            </label>
            <Input
                id={input.name}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                onChange={input.onChange}
                required={input.required}
                className={input.className}
            />
        </div>
    );
});
