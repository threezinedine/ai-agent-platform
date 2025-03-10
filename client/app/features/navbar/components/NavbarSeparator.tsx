import clsx from 'clsx';
import React from 'react';

export default function NavbarSepartor() {
	return (
		<div
			className={clsx(
				'h-6',
				'w-px',
				'bg-gray-300',
				'dark:bg-gray-600',
				'mx-7'
			)}
		/>
	);
}
