'use client';

import React from 'react';
import { Logo } from './Logo';
import clsx from 'clsx';
import MyLink from './MyLink';

export default function UnAuthNavbar() {
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
			<div className={clsx('p-2', 'flex', 'space-x-4', 'mr-4')}>
				<MyLink
					href="/login"
					testId="login"
				>
					Login
				</MyLink>
				<MyLink
					href="/register"
					testId="register"
					secondary
				>
					Register
				</MyLink>
			</div>
		</div>
	);
}
