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
import UserAvatar from '@/app/components/UserAvatar';
import NavbarRequest from '../services/navbarRequest';
import NavbarSepartor from './NavbarSeparator';
import { useLang } from '@/app/features/language';

function AuthNavbar() {
	const { user, logout } = useContext(AuthContext);
	const router = useRouter();
	const navbarRequest = new NavbarRequest();
	const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
	const { t } = useLang();

	useEffect(() => {
		(async () => {
			const response = await navbarRequest.getAvatar();
			if (response.isSuccess()) {
				setAvatarUrl(response.getData());
			}
		})();
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
				triggerNode={
					<UserAvatar
						testId={user?.username}
						username={user?.username || '?'}
						image={avatarUrl}
					/>
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

export default function AuthenticatedNavbar() {
	return (
		<AuthenticatePage>
			<AuthNavbar />
		</AuthenticatePage>
	);
}
