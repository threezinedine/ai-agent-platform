interface Validator {
	validate: (input: string) => boolean;
	message: string;
}

interface InputProps {
	title: string;
	testId: string;
	validators?: Validator[];
	placeholder?: string;
}

export default interface FormProps {
	testId: string;
	name: string;
	submitFunc?: () => void;
	inputs?: InputProps[];
	className?: string;
}

export type { InputProps, Validator };
