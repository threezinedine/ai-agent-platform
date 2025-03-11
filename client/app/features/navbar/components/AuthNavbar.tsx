'use client';

import React, { useContext, useEffect } from 'react';
import { AuthenticatePage, AuthContext } from '@/app/features/authentication';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/app/features/toast';
import NavbarCommon from './NavbarCommon';
import {
	ToggleMenu,
	ToggleItem,
	ToggleMenuSeparator,
} from '@/app/components/ToggleMenu';
import NavbarSepartor from './NavbarSeparator';
import { useLang } from '@/app/features/language';
import { NavbarAvatar, useAvatar } from '@/app/features/avatar';

function AuthNavbar() {
	const { user, logout } = useContext(AuthContext);
	const router = useRouter();
	const { t } = useLang();
	const { reloadAvatar } = useAvatar();

	useEffect(() => {
		reloadAvatar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function onLogout() {
		logout();
		router.push('/');
		ToastService.getInstance().addToastMessage({
			message: t('LOG_OUT_SUCCESSFULLY'),
			type: 'success',
			duration: 1000,
		});
	}

	return (
		<NavbarCommon>
			<NavbarSepartor />
			<ToggleMenu
				testId="user-menu"
				menuOnRight
				triggerNode={<NavbarAvatar username={user?.username || ''} />}
			>
				<ToggleItem onClick={() => router.push('/dashboard')}>
					{t('DASHBOARD')}
				</ToggleItem>
				<ToggleItem onClick={() => router.push('/profile')}>
					{t('PROFILE')}
				</ToggleItem>
				<ToggleMenuSeparator />
				<ToggleItem
					onClick={onLogout}
					testId="logout"
					className="text-red-500"
				>
					{t('LOG_OUT')}
				</ToggleItem>
			</ToggleMenu>
		</NavbarCommon>
	);
}

export default function AuthenticatedNavbar() {
	return (
		<AuthenticatePage>
			<AuthNavbar />
		</AuthenticatePage>
	);
}
