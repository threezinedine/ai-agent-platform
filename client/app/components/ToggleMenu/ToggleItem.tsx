import clsx from 'clsx';
import React from 'react';

export default function ToggleItem({
	children,
	testId,
	onClick,
	className,
}: {
	children: React.ReactNode;
	testId?: string;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<div
			data-testid={testId}
			onClick={onClick}
			className={clsx(
				'block',
				'px-4',
				'py-2',
				'text-sm',
				'w-full',
				'cursor-pointer',
				'hover:bg-gray-100',
				'dark:hover:bg-gray-700',
				className
			)}
		>
			{children}
		</div>
	);
}
