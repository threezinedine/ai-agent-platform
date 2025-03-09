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
}

export default interface FormProps {
	testId: string;
	name: string;
	submitFunc?: (data: { [key: string]: string }) => void;
	inputs?: InputProps[];
	className?: string;
	submitHidden?: boolean;
}

export type { InputProps, Validator };
