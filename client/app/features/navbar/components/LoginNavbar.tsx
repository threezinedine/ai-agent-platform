import React from 'react';
import { Logo } from './Logo';
import clsx from 'clsx';

export default function LoginNavbar() {
	return (
		<div
			className={clsx(
				'flex',
				'items-center',
				'justify-between',
				'w-full',
				'p-4'
			)}
		>
			<Logo />
		</div>
	);
}
