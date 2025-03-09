import clsx from 'clsx';
import 'react';

interface ButtonProps {
	text?: string;
	onClick?: () => void;
	className?: string;
	testId?: string;
	variant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'outline'
		| 'subtle'
		| 'ghost'
		| 'link';
	secondary?: boolean;
	fullWidth?: boolean;
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
	icon?: React.ReactNode | null;
	iconPosition?: 'left' | 'right';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	text = 'Button',
	onClick,
	testId,
	variant = 'primary',
	fullWidth = false,
	size = 'md',
	className,
	disabled = false,
	rounded = 'md',
	icon = null,
	iconPosition = 'left',
}) => {
	const sizeStyles = {
		sm: clsx('text-sm', 'px-3', 'py-1.5'),
		md: clsx('text-base', 'px-4', 'py-2'),
		lg: clsx('text-lg', 'px-6', 'py-3'),
	};

	const roundedStyles = {
		none: clsx('rounded-none'),
		sm: clsx('rounded-sm'),
		md: clsx('rounded-md'),
		lg: clsx('rounded-lg'),
		full: clsx('rounded-full'),
	};

	const variantStyles = {
		primary: clsx(
			'bg-blue-600',
			'hover:bg-blue-700',
			'text-white',
			'dark:bg-blue-500',
			'dark:hover:bg-blue-600',
			'focus:ring-blue-500',
			'dark:focus:ring-blue-400'
		),
		secondary: clsx(
			'bg-gray-600',
			'hover:bg-gray-700',
			'text-white',
			'dark:bg-gray-500',
			'dark:hover:bg-gray-600',
			'focus:ring-gray-500',
			'dark:focus:ring-gray-400'
		),
		success: clsx(
			'bg-green-600',
			'hover:bg-green-700',
			'text-white',
			'dark:bg-green-500',
			'dark:hover:bg-green-600',
			'focus:ring-green-500',
			'dark:focus:ring-green-400'
		),
		warning: clsx(
			'bg-yellow-500',
			'hover:bg-yellow-600',
			'text-white',
			'dark:bg-yellow-400',
			'dark:hover:bg-yellow-500',
			'focus:ring-yellow-500',
			'dark:focus:ring-yellow-400'
		),
		danger: clsx(
			'bg-red-600',
			'hover:bg-red-700',
			'text-white',
			'dark:bg-red-500',
			'dark:hover:bg-red-600',
			'focus:ring-red-500',
			'dark:focus:ring-red-400'
		),
		outline: clsx(
			'bg-transparent',
			'border',
			'border-gray-300',
			'text-gray-700',
			'hover:bg-gray-50',
			'dark:border-gray-600',
			'dark:text-gray-200',
			'dark:hover:bg-gray-800',
			'focus:ring-gray-500',
			'dark:focus:ring-gray-400'
		),
		subtle: clsx(
			'bg-gray-100',
			'hover:bg-gray-200',
			'text-gray-800',
			'dark:bg-gray-800',
			'dark:hover:bg-gray-700',
			'dark:text-gray-200',
			'focus:ring-gray-500',
			'dark:focus:ring-gray-400'
		),
		ghost: clsx(
			'bg-transparent',
			'hover:bg-gray-100',
			'text-gray-700',
			'dark:hover:bg-gray-800',
			'dark:text-gray-200',
			'focus:ring-gray-500',
			'dark:focus:ring-gray-400'
		),
		link: clsx(
			'bg-transparent',
			'underline',
			'text-blue-600',
			'hover:text-blue-800',
			'dark:text-blue-400',
			'dark:hover:text-blue-300',
			'p-0',
			'focus:ring-blue-500',
			'dark:focus:ring-blue-400'
		),
	};

	const fullWidthStyles = fullWidth ? clsx('w-full') : '';
	const disabledStyles = disabled
		? clsx('opacity-50', 'cursor-not-allowed')
		: clsx('cursor-pointer');

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
				sizeStyles[size],
				roundedStyles[rounded],
				variantStyles[variant],
				fullWidthStyles,
				disabledStyles,
				'inline-flex',
				'items-center',
				'justify-center',
				'font-medium',
				'transition-all',
				'duration-300',
				'focus:outline-none',
				'focus:ring',
				'focus:ring-opacity-50',
				'focus:ring-2',
				'focus:ring-offset-2',
				'select-none',
				className
			)}
			{...(testId ? { 'data-testid': testId } : {})}
			onClick={handleClick}
		>
			{icon && iconPosition === 'left' && (
				<div className={clsx('mr-2')}>{icon}</div>
			)}
			{text}
			{icon && iconPosition === 'right' && (
				<div className={clsx('ml-2')}>{icon}</div>
			)}
		</div>
	);
};

export default Button;
