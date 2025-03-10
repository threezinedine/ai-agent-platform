'use client';

import React from 'react';
import clsx from 'clsx';
import MyLink from './MyLink';
import NavbarCommon from './NavbarCommon';
import NavbarSepartor from './NavbarSeparator';

export default function UnAuthNavbar() {
	return (
		<NavbarCommon>
			<NavbarSepartor />
			<div className={clsx('flex', 'space-x-4')}>
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
