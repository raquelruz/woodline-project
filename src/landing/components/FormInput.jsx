import { Input } from "./Input";

export const FormInput = ({ containerClass, input, label }) => {
    return (
        <div className={containerClass}>
            <label htmlFor={input.name} className={`font-medium text- text-primary ${label.className}`}>
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
};
