export type InputProps = {
	name: string;
    displayName?: string;
	type: string;
	placeholder?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
};

export type InputValue = string | number | undefined | null;

export type LabelProps = {
	text: string;
	className?: string;
};

