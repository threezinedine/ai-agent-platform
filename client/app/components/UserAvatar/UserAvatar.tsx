import clsx from 'clsx';
import React from 'react';

export default function UserAvatar({
	username,
	image,
	testId,
	size = 'md',
}: {
	username: string;
	image?: File;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	testId?: string;
}) {
	const firstLetter = username.charAt(0).toUpperCase() || '?';

	const sizeClasses = {
		xs: clsx('w-6', 'h-6', 'text-xs'),
		sm: clsx('w-8', 'h-8', 'text-sm'),
		md: clsx('w-10', 'h-10', 'text-base'),
		lg: clsx('w-12', 'h-12', 'text-lg'),
		xl: clsx('w-14', 'h-14', 'text-xl'),
		'2xl': clsx('w-16', 'h-16', 'text-2xl'),
	};

	function generateColor(name: string) {
		const colors = [
			clsx('bg-blue-500', 'text-blue-50', 'hover:bg-blue-600'),
			clsx('bg-purple-500', 'text-purple-50', 'hover:bg-purple-600'),
			clsx('bg-green-500', 'text-green-50', 'hover:bg-green-600'),
			clsx('bg-red-500', 'text-red-50', 'hover:bg-red-600'),
			clsx('bg-yellow-500', 'text-yellow-50', 'hover:bg-yellow-600'),
			clsx('bg-pink-500', 'text-pink-50', 'hover:bg-pink-600'),
			clsx('bg-indigo-500', 'text-indigo-50', 'hover:bg-indigo-600'),
			clsx('bg-steal-500', 'text-steal-50', 'hover:bg-steal-600'),
		];
		let sum = 0;
		for (let i = 0; i < name.length; i++) {
			sum += name.charCodeAt(i) * 2;
		}

		return colors[sum % colors.length];
	}

	const letterColorClasses = generateColor(username);

	return (
		<div
			data-testid={testId}
			className={clsx('select-none', 'cursor-pointer')}
		>
			{image ? (
				<div></div>
			) : (
				<div
					className={clsx(
						letterColorClasses,
						sizeClasses[size],
						'flex',
						'items-center',
						'justify-center',
						'rounded-full',
						'font-medium'
					)}
				>
					{firstLetter}
				</div>
			)}
		</div>
	);
}
