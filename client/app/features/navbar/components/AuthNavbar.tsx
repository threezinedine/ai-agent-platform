'use client';

import React from 'react';
import { useAuth } from '@/app/features/authentication';
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
import { NavbarAvatar } from '@/app/features/avatar';

export default function AuthNavbar() {
	const { userInfo, logout } = useAuth();
	const router = useRouter();
	const { t } = useLang();

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
				triggerNode={
					<NavbarAvatar username={userInfo?.username || ''} />
				}
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
