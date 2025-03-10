'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

export default function ToggleMenu({
	children,
	testId,
	buttonText,
	className,
	triggerNode,
	menuOnRight,
}: {
	children: React.ReactNode;
	testId?: string;
	buttonText?: string;
	className?: string;
	triggerNode?: React.ReactNode;
	menuOnRight?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				menuRef.current &&
				buttonRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div
			data-testid={testId}
			className={clsx('relative', 'inline-block', className)}
		>
			<div
				ref={buttonRef}
				data-testid={testId ? `${testId}-trigger` : undefined}
				onClick={toggleMenu}
			>
				{triggerNode && triggerNode}
				{!triggerNode && (
					<div
						className={clsx(
							'inline-block',
							'w-32',
							'px-4',
							'py-2',
							'm-2',
							'rounded-lg',
							'bg-blue-500',
							'text-white',
							'cursor-pointer',
							'select-none',
							'active:bg-blue-700',
							'hover:bg-blue-600',
							'font-medium',
							'transition-all',
							'duration-200',
							'shadow-md',
							'hover:shadow-lg',
							'flex',
							'items-center',
							'justify-center',
							'space-x-2',
							'dark:bg-gray-800',
							'dark:hover:bg-gray-700'
						)}
					>
						<span>{buttonText ?? 'Menu'}</span>
						<svg
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				)}
			</div>

			{isOpen && (
				<div
					ref={menuRef}
					className={clsx(
						'absolute',
						{ 'left-2': !menuOnRight },
						{ 'right-2': menuOnRight },
						'mt-2',
						'w-48',
						'py-2',
						'rounded-lg',
						'bg-white',
						'dark:bg-gray-800',
						'ring-1',
						'ring-black',
						'dark:ring-gray-700',
						'ring-opacity-5',
						'shadow-lg',
						'transition-opacity',
						'duration-200',
						'z-50',
						'overflow-hidden'
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
