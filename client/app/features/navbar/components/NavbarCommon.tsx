import clsx from 'clsx';
import React from 'react';
import { Logo } from './Logo';

export default function NavbarCommon({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<div
			className={clsx(
				'flex',
				'items-center',
				'justify-between',
				'h-16',
				'w-full',
				'p-4'
			)}
		>
			<div className={clsx('flex', 'items-center')}>
				<Logo />
			</div>
			<div className={clsx('flex', 'items-center')}>{children}</div>
		</div>
	);
}
