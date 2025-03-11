'use client';

import React from 'react';
import clsx from 'clsx';
import MyLink from './MyLink';
import NavbarCommon from './NavbarCommon';
import NavbarSepartor from './NavbarSeparator';
import { useLang } from '@/app/features/language';

export default function UnAuthNavbar() {
	const { t } = useLang();

	return (
		<NavbarCommon>
			<NavbarSepartor />
			<div className={clsx('flex', 'space-x-4')}>
				<MyLink
					href="/login"
					testId="login"
				>
					{t('LOGIN')}
				</MyLink>
				<MyLink
					href="/register"
					testId="register"
					secondary
				>
					{t('REGISTER')}
				</MyLink>
			</div>
		</NavbarCommon>
	);
}
