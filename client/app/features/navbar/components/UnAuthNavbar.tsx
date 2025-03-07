'use client';

import React from 'react';
import clsx from 'clsx';
import MyLink from './MyLink';
import NavbarCommon from './NavbarCommon';

export default function UnAuthNavbar() {
	return (
		<NavbarCommon>
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
		</NavbarCommon>
	);
}
