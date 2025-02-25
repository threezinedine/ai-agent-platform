import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function MyLink({
	children,
	href,
	testId,
	secondary = false,
}: {
	children: React.ReactNode;
	href: string;
	testId?: string;
	secondary?: boolean;
}) {
	return (
		<Link
			href={href}
			{...(testId ? { 'data-testid': testId } : {})}
			className={clsx(
				'px-4',
				'py-2',
				'rounded',
				'cursor-pointer',
				secondary
					? 'text-black bg-white hover:text-white hover:bg-transparent'
					: 'text-white bg-transparent hover:text-gray-300 hover:bg-gray-700'
			)}
		>
			{children}
		</Link>
	);
}
