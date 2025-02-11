import 'react';

interface ButtonProps {
	text?: string;
	onClick?: () => void;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
	function handleClick() {
		if (disabled) {
			return;
		}

		if (onClick) {
			onClick();
		}
	}

	return <div onClick={handleClick}>{text ?? 'Button'}</div>;
};
