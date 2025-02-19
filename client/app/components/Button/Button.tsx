import 'react';

interface ButtonProps {
	text?: string;
	onClick?: () => void;
	disabled?: boolean;
	testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	disabled,
	testId,
}) => {
	function handleClick() {
		if (disabled) {
			return;
		}

		if (onClick) {
			onClick();
		}
	}

	return (
		<div
			{...(testId ? { 'data-testid': testId } : {})}
			onClick={handleClick}
		>
			{text ?? 'Button'}
		</div>
	);
};
