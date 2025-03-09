interface Validator {
	validate: (input: string) => boolean;
	message: string;
}

interface InputProps {
	title: string;
	testId: string;
	type?: string;
	validators?: Validator[];
	placeholder?: string;
	disabled?: boolean;
	defaultValue?: string;
	required?: boolean;
}

export default interface FormProps {
	testId: string;
	name: string;
	description?: string | null;
	footer?: React.ReactNode | null;
	submitFunc?: (data: { [key: string]: string }) => void;
	inputs?: InputProps[];
	className?: string;
	submitHidden?: boolean;
	shadowDisabled?: boolean;
}

export type { InputProps, Validator };
