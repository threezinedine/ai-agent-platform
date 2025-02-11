interface Validator {
	validate: (input: string) => boolean;
	message: string;
}

interface InputProps {
	title: string;
	testId: string;
	validators?: Validator[];
}

export default interface FormProps {
	testId: string;
	name: string;
	submitFunc?: () => void;
	inputs?: InputProps[];
}

export type { InputProps, Validator };
