import clsx from 'clsx';
import React, { useState } from 'react';
import Image from 'next/image';

export default function UserAvatar({
	username,
	image,
	testId,
	hoverIcon = null,
	size = 'md',
}: {
	username: string;
	image?: string | null;
	size?:
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| '8xl';
	testId?: string;
	hoverIcon?: React.ReactNode;
}) {
	const firstLetter = username.charAt(0).toUpperCase() || '?';

	const sizeClasses = {
		xs: clsx('w-6', 'h-6', 'text-xs'),
		sm: clsx('w-8', 'h-8', 'text-sm'),
		md: clsx('w-10', 'h-10', 'text-base'),
		lg: clsx('w-12', 'h-12', 'text-lg'),
		xl: clsx('w-14', 'h-14', 'text-xl'),
		'2xl': clsx('w-16', 'h-16', 'text-2xl'),
		'3xl': clsx('w-20', 'h-20', 'text-3xl'),
		'4xl': clsx('w-24', 'h-24', 'text-4xl'),
		'5xl': clsx('w-28', 'h-28', 'text-5xl'),
		'6xl': clsx('w-32', 'h-32', 'text-6xl'),
		'7xl': clsx('w-36', 'h-36', 'text-7xl'),
		'8xl': clsx('w-40', 'h-40', 'text-8xl'),
	};

	const imageSizes = {
		xs: 24,
		sm: 32,
		md: 40,
		lg: 48,
		xl: 56,
		'2xl': 64,
		'3xl': 80,
		'4xl': 96,
		'5xl': 112,
		'6xl': 128,
		'7xl': 144,
		'8xl': 160,
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
	const [isHovered, setIsHovered] = useState(false);

	const iconClasses = clsx(
		'absolute',
		'top-0',
		'left-0',
		'flex',
		'items-center',
		'justify-center',
		'w-full',
		'h-full',
		'rounded-full',
		'bg-black',
		'bg-opacity-50',
		'text-white',
		'opacity-0',
		'transition-opacity',
		'duration-300',
		'ease-in-out',
		'hover:opacity-100'
	);
	const iconInteralClasses = clsx();

	return (
		<div
			data-testid={testId}
			className={clsx(
				'relative',
				'flex',
				'items-center',
				'justify-center',
				'select-none',
				'cursor-pointer',
				'hover:opacity-80'
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
		>
			{image ? (
				<div className={clsx('rounded-full', 'overflow-hidden')}>
					<Image
						src={image}
						alt="Image"
						width={imageSizes[size]}
						height={imageSizes[size]}
					/>
					{isHovered && hoverIcon && (
						<div className={iconClasses}>
							<div className={iconInteralClasses}>
								{hoverIcon}
							</div>
						</div>
					)}
				</div>
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
					{isHovered && hoverIcon && (
						<div className={iconClasses}>
							<div className={iconInteralClasses}>
								{hoverIcon}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
