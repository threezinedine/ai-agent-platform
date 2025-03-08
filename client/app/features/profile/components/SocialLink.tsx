import clsx from 'clsx';
import React from 'react';

export default function SocialLink({
	icon,
	name,
	label,
	value = '',
	onValueChanged,
}: {
	icon: React.ReactNode;
	name: string;
	label?: string;
	value?: string;
	onValueChanged?: (value: string) => void;
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onValueChanged) {
			onValueChanged(e.target.value);
		}
	};

	return (
		<div
			className={clsx(
				'group',
				'flex',
				'items-center',
				'p-3',
				'rounded-lg',
				'hover:bg-gray-50',
				'dark:hover:bg-gray-700',
				'transition-all',
				'duration-200'
			)}
		>
			<div
				className={clsx(
					'flex-shrink-0',
					'w-10',
					'h-10',
					'flex',
					'items-center',
					'justify-center',
					'rounded-full',
					'bg-gray-100',
					'dark:bg-gray-700',
					'text-gray-500',
					'dark:text-gray-400'
				)}
			>
				{icon}
			</div>
			<div className={clsx('ml-3', 'flex-1')}>
				<label
					htmlFor={name}
					className={clsx(
						'block',
						'text-sm',
						'font-medium',
						'text-gray-700',
						'dark:text-gray-300'
					)}
				>
					{label}
				</label>
				<input
					type="text"
					id={name}
					name={name}
					value={value}
					onChange={handleChange}
					className={clsx(
						'mt-1',
						'block',
						'w-full',
						'py-2',
						'px-3',
						'border',
						'border-gray-300',
						'dark:border-gray-600',
						'bg-white',
						'dark:bg-gray-700',
						'rounded-md',
						'shadow-sm',
						'text-sm',
						'text-gray-900',
						'dark:text-gray-100',
						'focus:outline-none',
						'focus:ring-2',
						'focus:ring-blue-500',
						'dark:focus:ring-blue-400',
						'focus:border-transparent',
						'transition-all',
						'duration-200'
					)}
					placeholder={`Enter your ${label} profile`}
				/>
			</div>
		</div>
	);
}
