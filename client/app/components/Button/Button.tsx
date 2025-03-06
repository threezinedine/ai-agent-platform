import clsx from 'clsx';
import 'react';

interface ButtonProps {
	text?: string;
	onClick?: () => void;
	disabled?: boolean;
	testId?: string;
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	disabled,
	testId,
	className,
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
			className={clsx(
				{ 'bg-blue-500': !className },
				'rounded-md',
				'select-none',
				'text-white',
				'p-4',
				'mx-2',
				'cursor-pointer',
				'inline-block',
				{ 'hover:bg-blue-600': !className },
				'transition-colors',
				'duration-200',
				'ease-in-out',
				{ 'opacity-50': disabled },
				className
			)}
			{...(testId ? { 'data-testid': testId } : {})}
			onClick={handleClick}
		>
			{text ?? 'Button'}
		</div>
	);
};
